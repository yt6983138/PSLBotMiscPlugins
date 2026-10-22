using Microsoft.Extensions.Logging;
using PhigrosLibraryCSharp.CloudSave;
using PhigrosLibraryCSharp.CloudSave.HttpModels;
using PSLDiscordBot.Core.Models;
using PSLDiscordBot.Framework.Utilities;
using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace SaveArchiveProgram;

public class ExtendedSave : Save
{
	public ExtendedSave(Save save) : base(save.SessionToken, save.IsInternational) { }

	public string GetAddress(string address)
	{
		return (this.IsInternational ? "https://kviehlel.cloud.ap-sg.tapapis.com" : "https://rak3ffdi.cloud.tds1.tapapis.cn") + address;
	}

	public async Task<string> GetPlayerInfoRaw()
	{
		string addr = this.GetAddress("/1.1/users/me");
		using HttpResponseMessage response = await this.RequestHandler.Invoke(this, this.CreateDefaultMessage(HttpMethod.Get, addr), default);
		string str = await response.Content.ReadAsStringAsync();
		return str;
	}
}

public record class ArchivedInfo(DateTime ArchivedAt, List<string> ArchivedFiles);
public class SaveArchiveService
{
	private record struct ArchiveQueueItem(ulong UserId, Save Save);

	private readonly ILogger<SaveArchiveService> _logger;

	private readonly Queue<ArchiveQueueItem> _archiveQueue = new();
	private readonly ScopedSemaphoreSlim _archiveLock = new(1, 1);

	public CancellationTokenSource ProcessLoopSource { get; } = new();
	public ConcurrentDictionary<ulong, byte> AgreedTerms { get; } = new();

	public SaveArchiveService(ILogger<SaveArchiveService> logger)
	{
		this._logger = logger;

		Task.Run(this.Process);
	}

	/// <summary>
	/// true if first time calling, false on subsequent calls
	/// </summary>
	/// <param name="userId"></param>
	/// <returns></returns>
	public bool TryAgreeTerms(ulong userId)
	{
		return this.AgreedTerms.TryAdd(userId, 0);
	}

	private async Task Process()
	{
		while (!this.ProcessLoopSource.IsCancellationRequested)
		{
			try
			{
				await Core();
			}
			catch (Exception ex)
			{
				this._logger.LogError(ex, "Error while processing archive queue");
			}
		}

		async Task Core()
		{
			await Task.Delay(3000);

			ArchiveQueueItem queueItem = default;
			using (ScopedSemaphoreSlim.Scope scope = await this._archiveLock.EnterScopeAsync())
			{
				if (this._archiveQueue.Count == 0) return;
				queueItem = this._archiveQueue.Dequeue();
				this._logger.LogInformation("Archiving save for user {id}, {left} left", queueItem.UserId, this._archiveQueue.Count);
			}

			await this.Archive(queueItem.UserId, queueItem.Save);
		}
	}

	/// <summary>
	/// false if user already in the queue
	/// </summary>
	/// <param name="userData"></param>
	/// <returns></returns>
	public async Task<bool> EnqueueArchive(UserData userData)
	{
		ArchiveQueueItem queueItem = new(userData.UserId, userData.SaveCache);
		using ScopedSemaphoreSlim.Scope _ = await this._archiveLock.EnterScopeAsync();
		if (this._archiveQueue.Any(x => x.UserId == queueItem.UserId)) return false;

		this._archiveQueue.Enqueue(queueItem);
		return true;
	}

	public async Task Archive(ulong userId, Save save)
	{
		DateTime now = DateTime.Now;

		ExtendedSave wrapped = new(save);
		byte[] playerInfo = Encoding.UTF8.GetBytes(await wrapped.GetPlayerInfoRaw());

		string saveDir = $"./ArchiveProgram/{userId}";
		Directory.CreateDirectory(saveDir);

		string infoHash = Convert.ToHexStringLower(SHA256.HashData(playerInfo));
		string infoFileName = $"PlayerInfo_{infoHash}.json";
		await File.WriteAllBytesAsync(Path.Combine(saveDir, infoFileName), playerInfo);

		SaveInfoContainer saveInfo = await wrapped.GetSaveInfoFromCloudAsync();
		string saveInfoString = JsonSerializer.Serialize(saveInfo);
		byte[] saveInfoBytes = Encoding.UTF8.GetBytes(saveInfoString);
		string saveInfoHash = Convert.ToHexStringLower(SHA256.HashData(saveInfoBytes));
		string saveInfoFileName = $"SaveInfo_{saveInfoHash}.json";
		await File.WriteAllBytesAsync(Path.Combine(saveDir, saveInfoFileName), saveInfoBytes);

		List<string> archivedFiles = [infoFileName, saveInfoFileName];

		foreach (SaveInfo item in saveInfo.Results)
		{
			if (item.GameFile is null) continue;
			string fileObjectId = item.GameFile.ObjectId;

			byte[]? content = null;
			for (int i = 0; i < 3; i++)
			{
				try
				{
					content = await wrapped.GetSaveZipAsync(item.Simplify());
					break;
				}
				catch (Exception ex)
				{
					this._logger.LogWarning(ex, "Failed to get save context for user {id}, attempt {i} with objectId {obj}", userId, i + 1, fileObjectId);

				}
			}
			if (content is null)
			{
				this._logger.LogError("Failed to get save context for user {id} after 3 attempts, skipping objectId {obj}", userId, fileObjectId);
				continue;
			}

			string fileHash = Convert.ToHexStringLower(SHA256.HashData(content));
			string fileName = $"Save_{fileObjectId}_{fileHash}.zip";
			await File.WriteAllBytesAsync(Path.Combine(saveDir, fileName), content);
			archivedFiles.Add(fileName);

			await Task.Delay(1000);
		}

		ArchivedInfo archivedInfo = new(now, archivedFiles);
		await File.WriteAllBytesAsync(Path.Combine(saveDir, $"ArchivedInfo_{(long)(now - DateTime.UnixEpoch).TotalMilliseconds}.json"), JsonSerializer.SerializeToUtf8Bytes(archivedInfo));

		this._logger.LogInformation("Archived save for user {id} starting at {time}, took {length}", userId, now, DateTime.Now - now);
	}
}
