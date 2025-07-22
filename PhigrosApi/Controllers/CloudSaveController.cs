using Microsoft.AspNetCore.Mvc;
using PhigrosLibraryCSharp;
using PhigrosLibraryCSharp.Cloud.RawData;
using PhigrosLibraryCSharp.GameRecords;
using PSLDiscordBot.Core.Services.Phigros;
using System.Collections.Concurrent;
using System.IO.Compression;

namespace PhigrosApi.Controllers;
public class CloudSaveController : CustomControllerBase
{
	public static ConcurrentDictionary<string, Save> TokenSaveCache { get; set; } = new();

	private PhigrosService _phigrosData;

	public CloudSaveController(ILoggerFactory logger, PhigrosService data)
		: base(logger)
	{
		this._phigrosData = data;
	}

	private async Task<Save> GetSaveOrAdd(string token, bool isInternational)
	{
		if (TokenSaveCache.TryGetValue(token, out Save? save))
			return save;

		Save newSave = new(token, isInternational); // will throw if invalid token
		await newSave.GetUserInfoAsync();
		this._logger.LogDebug("Adding token {token} to cache", token);
		return !TokenSaveCache.TryAdd(token, newSave) ? throw new ApplicationException("Failed to add to cache") : newSave;
	}
	private async Task<(IActionResult?, Save?)> GetSaveAndHandleError(string token, bool isInternational)
	{
		Save save;
		try
		{
			save = await this.GetSaveOrAdd(token, isInternational);
		}
		catch (ArgumentException argEx)
		{
			return (this.Error(argEx, code: ErrorCode.PhigrosTokenError), null);
		}
		catch (HttpRequestException argEx)
		{
			return (this.Error(argEx, code: ErrorCode.PhigrosTokenError), null);
		}
		catch (Exception ex)
		{
			return (this.Error(ex, code: ErrorCode.PhigrosLibraryInternalError), null);
		}

		return (null, save);
	}

	[HttpGet]
	[Route("phiApi/[controller]/GetSaveIndexes")]
	public async Task<IActionResult> GetSaveIndexes(bool isInternational)
	{
		(IActionResult? action, Save? save) = await this.GetSaveAndHandleError(await this.ReadRequestBodyAsString(), isInternational);
		if (save is null)
			return action!;

		List<object> timeList = [];
		try
		{
			RawSaveContainer container = await save.GetRawSaveFromCloudAsync();
			int index = 0;
			foreach (RawSave item in container.results)
			{
				timeList.Add(new { ModificationTime = item.modifiedAt.iso, Index = index });
				index++;
			}
		}
		catch (Exception ex)
		{
			return this.Error(ex, code: ErrorCode.PhigrosLibraryInternalError);
		}

		this._logger.LogDebug("{ip} requested save index successfully.", this.IP);
		return this.Json(timeList);
	}

	[HttpGet]
	[Route("phiApi/[controller]/GetSaveData")]
	public async Task<IActionResult> GetSaveData(int index, bool isInternational)
	{
		(IActionResult? action, Save? save) = await this.GetSaveAndHandleError(await this.ReadRequestBodyAsString(), isInternational);
		if (save is null)
			return action!;

		GameProgress progress;
		GameSettings settings;
		GameUserInfo userInfo;
		Summary summary;
		UserInfo outterUserInfo;
		try
		{
			SaveContext context = await save.GetSaveContextAsync(index);
			outterUserInfo = await save.GetUserInfoAsync();
			summary = context.ReadSummary();
			progress = context.ReadGameProgress();
			settings = context.ReadGameSettings();
			userInfo = context.ReadGameUserInfo();
		}
		catch (ArgumentOutOfRangeException ex)
		{
			return this.Error(ex, code: ErrorCode.ArgumentOutOfRange);
		}
		catch (Exception ex)
		{
			return this.Error(ex, code: ErrorCode.PhigrosLibraryInternalError);
		}

		this._logger.LogDebug("{ip} requested game user info successfully.", this.IP);
		return this.Json(new
		{
			Progress = progress,
			Settings = settings,
			GameUserInfo = userInfo,
			UserInfo = outterUserInfo,
			Summary = summary
		});
	}

	[HttpGet]
	[Route("phiApi/[controller]/GetDecryptedZip")]
	public async Task<IActionResult> GetDecryptedZip(int index, bool isInternational)
	{
		(IActionResult? action, Save? save) = await this.GetSaveAndHandleError(await this.ReadRequestBodyAsString(), isInternational);
		if (save is null)
			return action!;

		using MemoryStream newStream = new();
		ZipArchive newZip = new(newStream, ZipArchiveMode.Create);
		try
		{
			byte[] d = await save.GetSaveRawZipAsync((await save.GetRawSaveFromCloudAsync()).GetParsedSaves()[index]);

			foreach (ZipArchiveEntry entry in new ZipArchive(new MemoryStream(d), ZipArchiveMode.Read).Entries)
			{
				ZipArchiveEntry newEntry = newZip.CreateEntry(entry.Name);

				using Stream entryStream = entry.Open();
				using Stream newEntryStream = newEntry.Open();

				byte[] raw = new byte[entry.Length];
				entryStream.ReadExactly(raw);

				byte[] decrypted = await save.Decrypt(raw[1..]);
				newEntryStream.Write(decrypted);
			}
			newZip.Dispose();
		}
		catch (ArgumentOutOfRangeException ex)
		{
			return this.Error(ex, code: ErrorCode.ArgumentOutOfRange);
		}
		catch (Exception ex)
		{
			return this.Error(ex, code: ErrorCode.PhigrosLibraryInternalError);
		}

		this._logger.LogDebug("{ip} requested decrypted zip successfully.", this.IP);
		return this.File(newStream.ToArray(), "application/zip");
	}

	[HttpGet]
	[Route("phiApi/[controller]/GetRecords")]
	public async Task<IActionResult> GetRecords(int index, bool isInternational)
	{
		(IActionResult? action, Save? save) = await this.GetSaveAndHandleError(await this.ReadRequestBodyAsString(), isInternational);
		if (save is null)
			return action!;

		try
		{
			SaveContext context = await save.GetSaveContextAsync(index);
			GameRecord gameRecords = context.ReadGameRecord(this._phigrosData.DifficultiesMap);

			this._logger.LogDebug("{ip} requested summary and save successfully.", this.IP);
			return this.Json(gameRecords);
		}
		catch (ArgumentOutOfRangeException ex)
		{
			return this.Error(ex, code: ErrorCode.ArgumentOutOfRange);
		}
		catch (Exception ex)
		{
			return this.Error(ex, code: ErrorCode.PhigrosLibraryInternalError);
		}
	}
}
