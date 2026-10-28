using PhigrosLibraryCSharp.CloudSave;
using PhigrosLibraryCSharp.CloudSave.HttpModels;
using PSLDiscordBot.Core.Models.LocalImport;
using System.IO.Compression;
using System.Security.Cryptography;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace SaveArchiveProgram;

/// <summary>
/// Reads the newest save of the newest archive written by <see cref="SaveArchiveService"/> for one user. Only the
/// requesting user's own archive directory is ever touched.
/// </summary>
public static class LocalSaveArchiveProvider
{
	/// <summary>
	/// Provisional limit on one archived ZIP's raw file size and on its total declared decoded entry size. Owner confirmation pending.
	/// </summary>
	public const long MaxArchiveBytes = 16 * 1024 * 1024;

	// Archives are only created for international users (ArchiveSaveCommand), and the archive records do not store the flag.
	private const bool ArchivedSavesAreInternational = true;

	// The archived ZIP is decrypted without a live session; Save.Decrypt ignores the token (owner-confirmed).
	private const string PlaceholderSessionToken = "archive-offline";

	private sealed record class LatestArchive(string UserDir, ArchivedInfo Manifest, SaveInfo Save, string ZipPath);

	/// <summary>
	/// True when the user has at least one readable archived save. Does not decrypt anything.
	/// </summary>
	public static async Task<bool> HasArchiveAsync(ulong userId)
	{
		return await FindLatestAsync(userId) is not null;
	}

	/// <summary>
	/// Decrypts the newest archived save into an import. Returns null when there is none or it cannot be read.
	/// </summary>
	public static async Task<ParsedLocalImport?> ReadLatestAsync(ulong userId, CancellationToken cancellationToken = default)
	{
		LatestArchive? latest = await FindLatestAsync(userId);
		if (latest is null) return null;

		try
		{
			// The raw file is read as a whole, so its size bounds the raw bytes handed to the library.
			if (new FileInfo(latest.ZipPath).Length > MaxArchiveBytes) return null;

			using (ZipArchive zip = ZipFile.OpenRead(latest.ZipPath))
			{
				long declaredBytes = zip.Entries.Sum(x => x.Length);
				if (declaredBytes > MaxArchiveBytes) return null;
			}

			using Save save = new(PlaceholderSessionToken, ArchivedSavesAreInternational);
			await using FileStream stream = File.OpenRead(latest.ZipPath);
			SaveContext context = await SaveContext.FromZipAsync(stream, latest.Save, save.Decrypt, cancellationToken);

			return new(
				[],
				context.ReadGameRecord(),
				await TryReadPlayerInfoAsync(latest.UserDir, latest.Manifest),
				context.ReadGameUserInfo(),
				context.ReadGameProgress());
		}
		catch (Exception ex) when (ex is IOException or InvalidDataException or ArgumentException or FormatException or CryptographicException or JsonException)
		{
			// TODO: add log here
			return null;
		}
	}

	private static async Task<LatestArchive?> FindLatestAsync(ulong userId)
	{
		string userDir = Path.GetFullPath($"{SaveArchiveService.ArchiveProgramDir}/{userId}");
		if (!Directory.Exists(userDir)) return null;

		List<long> archivedTimes = [];
		try
		{
			foreach (string path in Directory.GetFiles(userDir, "ArchivedInfo_*.json"))
			{
				string name = Path.GetFileName(path);
				if (long.TryParse(name["ArchivedInfo_".Length..^".json".Length], out long archivedMs)
					&& name == ArchivedInfoFileName(archivedMs))
				{
					archivedTimes.Add(archivedMs);
				}
			}
		}
		catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
		{
			return null;
		}

		// newest first; an unreadable or ambiguous archive is skipped in favor of the next newest
		foreach (long archivedMs in archivedTimes.OrderByDescending(x => x))
		{
			ArchivedInfo? manifest = await TryReadManifestAsync(userDir, archivedMs);
			if (manifest?.ArchivedFiles is null || manifest.ArchivedFiles.Any(x => x is null)) continue;

			// several player-info candidates are ambiguous, so the whole archive is unreadable
			if (manifest.ArchivedFiles.Count(x => x.StartsWith("PlayerInfo_", StringComparison.Ordinal)) > 1) continue;

			SaveInfoContainer? container = await TryReadSaveInfoAsync(userDir, manifest);
			// same as the transfer command: the first save listed is the latest
			SaveInfo? first = container?.Results?.FirstOrDefault();
			if (first?.GameFile is null || string.IsNullOrEmpty(first.GameFile.ObjectId)) continue;

			string? zipPath = TryGetSaveZipPath(userDir, manifest, first);
			if (zipPath is null) continue;

			return new(userDir, manifest, first, zipPath);
		}
		return null;
	}

	private static string ArchivedInfoFileName(long archivedMs)
	{
		return $"ArchivedInfo_{archivedMs}.json";
	}

	/// <summary>
	/// Resolves a plain file name inside the user's archive directory. Returns null for any path segment, invalid name, or missing file.
	/// </summary>
	private static string? TryGetUserFile(string userDir, string fileName)
	{
		if (string.IsNullOrEmpty(fileName) || fileName.IndexOfAny(Path.GetInvalidFileNameChars()) >= 0) return null;
		if (Path.GetFileName(fileName) != fileName) return null;

		try
		{
			string fullPath = Path.GetFullPath(Path.Combine(userDir, fileName));
			if (!string.Equals(Path.GetDirectoryName(fullPath), userDir, StringComparison.OrdinalIgnoreCase)) return null;

			return File.Exists(fullPath) ? fullPath : null;
		}
		catch (Exception ex) when (ex is ArgumentException or NotSupportedException or PathTooLongException)
		{
			return null;
		}
	}

	private static async Task<ArchivedInfo?> TryReadManifestAsync(string userDir, long archivedMs)
	{
		string? path = TryGetUserFile(userDir, ArchivedInfoFileName(archivedMs));
		if (path is null) return null;

		try
		{
			return JsonSerializer.Deserialize<ArchivedInfo>(await File.ReadAllTextAsync(path));
		}
		catch (Exception ex) when (ex is IOException or JsonException or UnauthorizedAccessException)
		{
			return null;
		}
	}

	private static async Task<SaveInfoContainer?> TryReadSaveInfoAsync(string userDir, ArchivedInfo manifest)
	{
		string[] saveInfoNames = manifest.ArchivedFiles.Where(x => x.StartsWith("SaveInfo_", StringComparison.Ordinal)).ToArray();
		if (saveInfoNames.Length != 1) return null;

		string? path = TryGetUserFile(userDir, saveInfoNames[0]);
		if (path is null) return null;

		try
		{
			return JsonSerializer.Deserialize<SaveInfoContainer>(await File.ReadAllTextAsync(path));
		}
		catch (Exception ex) when (ex is IOException or JsonException or UnauthorizedAccessException)
		{
			return null;
		}
	}

	/// <summary>
	/// Parses the archived raw users/me response the same way the library does (JsonNode over the response text).
	/// Missing or corrupt player metadata yields null and never fails the archive read.
	/// </summary>
	private static async Task<PlayerInfo?> TryReadPlayerInfoAsync(string userDir, ArchivedInfo manifest)
	{
		string[] playerInfoNames = manifest.ArchivedFiles.Where(x => x.StartsWith("PlayerInfo_", StringComparison.Ordinal)).ToArray();
		if (playerInfoNames.Length != 1) return null;

		string? path = TryGetUserFile(userDir, playerInfoNames[0]);
		if (path is null) return null;

		try
		{
			JsonNode? node = JsonNode.Parse(await File.ReadAllTextAsync(path));
			string? userName = node?["username"]?.GetValue<string>();
			string? objectId = node?["objectId"]?.GetValue<string>();
			DateTime? createdAt = node?["createdAt"]?.GetValue<DateTime>();
			DateTime? updatedAt = node?["updatedAt"]?.GetValue<DateTime>();
			if (node is null || userName is null || objectId is null || createdAt is null || updatedAt is null) return null;

			return new PlayerInfo()
			{
				NickName = node["nickname"]?.GetValue<string>(),
				UserName = userName,
				CreationTime = createdAt.Value,
				ModificationTime = updatedAt.Value,
				ObjectId = objectId,
			};
		}
		catch (Exception)
		{
			// Player metadata is optional: any read, parse, duplicate-key, or lazy-access failure leaves Player null.
			return null;
		}
	}

	private static string? TryGetSaveZipPath(string userDir, ArchivedInfo manifest, SaveInfo item)
	{
		if (item.GameFile is null) return null;

		string prefix = $"Save_{item.GameFile.ObjectId}_";
		string[] zipNames = manifest.ArchivedFiles.Where(x => x.StartsWith(prefix, StringComparison.Ordinal) && x.EndsWith(".zip", StringComparison.Ordinal)).ToArray();
		if (zipNames.Length != 1) return null;

		return TryGetUserFile(userDir, zipNames[0]);
	}
}
