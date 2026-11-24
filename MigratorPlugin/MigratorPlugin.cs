using Microsoft.AspNetCore.Builder;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PhiInfo.Core.Models.Information;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Models.SongAlias;
using PSLDiscordBot.Core.Searching;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using System.Text.Json;

namespace MigratorPlugin;

public class MigratorPlugin : IPlugin<MigratorPlugin>
{
	public static string Name => "Fun commands";
	public static string Description => "Fun commands like /poke";
	public static string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public static int Priority => 114514_0000;

	public static Task Load(WebApplicationBuilder hostBuilder)
	{
		return Task.CompletedTask;
	}
	public static Task<MigratorPlugin> Setup(WebApplication host)
	{
		MigratorPlugin plugin = new();
		ILogger<MigratorPlugin> logger = host.Services.GetRequiredService<ILogger<MigratorPlugin>>();
		ILifetimeService lifetimeService = host.Services.GetRequiredService<ILifetimeService>();
		lifetimeService.AfterMainInitialize += async (_, _2) =>
		{
			logger.LogInformation("Starting migration...");
			try
			{
				// 2026/11/23: MigrateAlias is a finished one-off, replaced by the duplicate alias cleanup
				await plugin.TrimDuplicateAliases(host, logger);
			}
			catch (Exception ex)
			{
				logger.LogError(ex, "Error occurred while migrating.");
			}
			logger.LogInformation("Migration completed.");
		};
		return Task.FromResult(plugin);
	}
	public Task Unload(WebApplication host, bool isSafeUnload) => Task.CompletedTask;

	private const bool DryRun = true;

	public async Task TrimDuplicateAliases(WebApplication host, ILogger<MigratorPlugin> logger)
	{
		// 2026/11/23
		AliasService aliasService = host.Services.GetRequiredService<AliasService>();
		PhigrosService phigrosService = host.Services.GetRequiredService<PhigrosService>();
		IOptions<Config> pslConfig = host.Services.GetRequiredService<IOptions<Config>>();

		List<SongInfo> songs = phigrosService.NonMultiLanguageInfos.Songs.ToList();
		Dictionary<string, int> songOrder = [];
		HashSet<string> reservedTexts = [];
		for (int i = 0; i < songs.Count; i++)
		{
			songOrder.TryAdd(songs[i].Id, i);
			string normalizedId = CandidateSearch.Normalize(songs[i].Id);
			string normalizedName = CandidateSearch.Normalize(songs[i].Name);
			if (normalizedId.Length > 0) reservedTexts.Add(normalizedId);
			if (normalizedName.Length > 0) reservedTexts.Add(normalizedName);
		}

		List<AliasTableId> tables = [AliasTableId.Global, .. aliasService.GetExistingServerTables()];
		logger.LogInformation("Alias cleanup over {Count} tables, DryRun = {DryRun}", tables.Count, DryRun);

		foreach (AliasTableId table in tables)
		{
			try
			{
				await this.TrimTable(aliasService, table, songOrder, reservedTexts, pslConfig.Value.AdminUserId, logger);
			}
			catch (Exception ex)
			{
				logger.LogError(ex, "Alias cleanup failed for table {Table}", table);
			}
		}
	}

	private async Task TrimTable(
		AliasService aliasService,
		AliasTableId table,
		Dictionary<string, int> songOrder,
		HashSet<string> reservedTexts,
		ulong operatorId,
		ILogger<MigratorPlugin> logger)
	{
		using AliasService.DynamicTableRequester reader = aliasService.GetDynamicTableRequester(table);
		// song data order first, keys unknown to song data after that (ordinal)
		List<SongAliasData> rows = reader.Aliases.ToList()
			.OrderBy(x => songOrder.TryGetValue(x.SongId, out int order) ? order : int.MaxValue)
			.ThenBy(x => x.SongId, StringComparer.Ordinal)
			.ToList();

		// song id -> (index into the stored Aliases, reason) to remove
		Dictionary<string, List<(int Index, string Reason)>> removals = [];
		Dictionary<string, List<(string SongId, string Alias)>> byNormalized = [];
		int removedCount = 0;
		foreach (SongAliasData row in rows)
		{
			HashSet<string> seen = [];
			for (int i = 0; i < row.Aliases.Count; i++)
			{
				string alias = row.Aliases[i];
				string normalized = CandidateSearch.Normalize(alias);
				string? reason = null;
				if (!seen.Add(normalized)) reason = "duplicate of an earlier alias of the same song";
				else if (reservedTexts.Contains(normalized)) reason = "equals a song id or name";

				if (reason is null)
				{
					if (!byNormalized.TryGetValue(normalized, out List<(string, string)>? list))
					{
						list = [];
						byNormalized[normalized] = list;
					}
					list.Add((row.SongId, alias));
					continue;
				}

				if (!removals.TryGetValue(row.SongId, out List<(int, string)>? indices))
				{
					indices = [];
					removals[row.SongId] = indices;
				}
				indices.Add((i, reason));
				removedCount++;
				if (DryRun)
				{
					logger.LogInformation("[{Table}] would remove alias {Alias} of song {SongId}: {Reason}", table, alias, row.SongId, reason);
				}
			}
		}

		int conflicts = 0;
		// explicit order: normalized alias (ordinal); entries are already in processing order (song data order)
		foreach (KeyValuePair<string, List<(string SongId, string Alias)>> pair in byNormalized.OrderBy(x => x.Key, StringComparer.Ordinal))
		{
			if (pair.Value.Count < 2) continue;
			conflicts++;
			logger.LogWarning("[{Table}] alias {Normalized} is shared by songs: {Songs}",
				table, pair.Key, string.Join(", ", pair.Value.Select(x => $"({x.SongId}, {x.Alias})")));
		}

		logger.LogInformation("[{Table}] {Removed} aliases to remove, {Conflicts} shared aliases left alone", table, removedCount, conflicts);
		if (DryRun || removals.Count == 0) return;

		foreach (SongAliasData row in rows)
		{
			if (!removals.TryGetValue(row.SongId, out List<(int Index, string Reason)>? removed)) continue;

			try
			{
				await this.ApplySongRemoval(aliasService, table, row, removed.Select(x => x.Index).ToList(), operatorId, logger);
				foreach ((int index, string reason) in removed)
				{
					logger.LogInformation("[{Table}] removed alias {Alias} of song {SongId}: {Reason}", table, row.Aliases[index], row.SongId, reason);
				}
			}
			catch (Exception ex)
			{
				logger.LogError(ex, "[{Table}] failed to clean aliases of song {SongId}", table, row.SongId);
			}
		}
	}

	private async Task ApplySongRemoval(
		AliasService aliasService,
		AliasTableId table,
		SongAliasData row,
		List<int> indices,
		ulong operatorId,
		ILogger<MigratorPlugin> logger)
	{
		// per song, so a failed song never leaves tracked metadata behind for the next save
		using AliasService.StaticTableRequester staticRequester = aliasService.GetStaticTableRequester();
		// MutateAliases subtracts with Except/IndexOf (set based, first ordinal occurrence only), so it cannot remove an
		// ordinal duplicate of a string that occurs more than once. Those indices are edited directly instead; every other
		// removal goes through MutateAliases (which also refreshes the cache snapshot).
		HashSet<string> directStrings = row.Aliases
			.Where(a => row.Aliases.Count(b => b == a) > 1)
			.ToHashSet();
		List<int> directIndices = indices.Where(i => directStrings.Contains(row.Aliases[i])).ToList();
		HashSet<string> mutateStrings = indices
			.Where(i => !directStrings.Contains(row.Aliases[i]))
			.Select(i => row.Aliases[i])
			.ToHashSet();

		if (directIndices.Count > 0)
		{
			using AliasService.DynamicTableRequester editor = aliasService.GetDynamicTableRequester(table);
			SongAliasData data = editor.FindAlias(row.SongId); // Find tracks the entity whatever the NoTracking default is; Update below makes sure it is saved
			List<Guid> removedKeys = [];
			foreach (int index in directIndices.OrderDescending())
			{
				removedKeys.Add(data.AliasMetadataKeys[index]);
				data.Aliases.RemoveAt(index);
				data.AliasMetadataKeys.RemoveAt(index);
			}
			foreach (Guid removed in removedKeys)
			{
				staticRequester.AliasMetadata.Add(new(Guid.NewGuid(), table, row.SongId, DateTime.Now)
				{
					ParentId = removed,
					OperationType = OperationType.Delete,
					OperatorId = operatorId
				});
			}
			editor.Update(data);
			staticRequester.SaveChanges();
			editor.SaveChanges();

			if (mutateStrings.Count == 0)
			{
				// no public way to refresh the snapshot without a MutateAliases change
				logger.LogWarning("[{Table}] song {SongId}: exact duplicates removed in the database only, the in-memory cache is refreshed on restart", table, row.SongId);
			}
		}

		if (mutateStrings.Count > 0)
		{
			using AliasService.DynamicTableRequester requester = aliasService.GetDynamicTableRequester(table);
			requester.MutateAliases(row.SongId, list => list.RemoveAll(mutateStrings.Contains), out List<Guid> guids, out _);
			foreach (Guid guid in guids)
			{
				await staticRequester.MutateMetadataExisting(guid, x => x.OperatorId = operatorId);
			}
		}
	}

	public async Task MigrateAlias(WebApplication host, ILogger<MigratorPlugin> logger)
	{
		// 2026/06/19
		AliasService aliasService = host.Services.GetRequiredService<AliasService>();
		IOptions<Config> pslConfig = host.Services.GetRequiredService<IOptions<Config>>();

		using SqliteConnection connection = new(pslConfig.Value.PSLDbConnectionString);
		connection.Open();

		SqliteCommand readCmd = connection.CreateCommand();
		readCmd.CommandText = "SELECT SongId, Alias FROM SongAlias";
		using SqliteDataReader reader = await readCmd.ExecuteReaderAsync();
		List<(string, string[])> aliases = [];
		while (await reader.ReadAsync())
		{
			string id = reader.GetString(0);
			string alias = reader.GetString(1);
			string[] aliasArray = JsonSerializer.Deserialize<string[]>(alias)!;
			aliases.Add((id, aliasArray));
		}

		using AliasService.StaticTableRequester staticRequester = aliasService.GetStaticTableRequester();
		using AliasService.DynamicTableRequester dynamicRequester = aliasService.GetDynamicTableRequester(AliasTableId.Global);
		foreach ((string, string[]) item in aliases)
		{
			List<Guid> keys = [];
			foreach (string item1 in item.Item2)
			{
				SongAliasMetadata metadata = new(Guid.NewGuid(), AliasTableId.Global, item.Item1, DateTime.Now)
				{
					OperationType = OperationType.Modify,
					OperationData = item1,
					OperatorId = pslConfig.Value.AdminUserId
				};
				staticRequester.AliasMetadata.Add(metadata);
				keys.Add(metadata.AliasId);
			}

			SongAliasData model = new(item.Item1, item.Item2.ToList(), keys);
			dynamicRequester.Aliases.Add(model);
		}
		staticRequester.SaveChanges();
		dynamicRequester.SaveChanges();
	}
}
