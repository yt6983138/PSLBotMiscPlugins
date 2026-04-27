using Microsoft.AspNetCore.Mvc;
using PhigrosLibraryCSharp.CloudSave;
using PhigrosLibraryCSharp.CloudSave.HttpModels;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Utility;
using System.Collections.Concurrent;
using System.IO.Compression;
using System.Net.Mime;

namespace PhigrosApi.Controllers;

public record class SaveTimeIndex(int Index, DateTime ModificationTime);
public record class SaveData(GameProgress Progress, GameSettings Settings, GameUserInfo GameUserInfo, PlayerInfo PlayerInfo, Summary Summary);

[Controller]
[ApiExplorerSettings(GroupName = PhigrosApiPlugin.GroupName)]
public class CloudSaveController : CustomControllerBase
{
	public static ConcurrentDictionary<string, Save> TokenSaveCache { get; set; } = new();
	public static int MaxCacheSize { get; set; } = 1000;

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
		await newSave.GetPlayerInfoAsync();
		if (TokenSaveCache.Count >= MaxCacheSize)
		{
			this._logger.LogInformation("PhigrosApi cache size exceeded. Removing entries.");
			foreach (string key in TokenSaveCache.Keys.Take(10))
				TokenSaveCache.TryRemove(key, out _);
		}
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

	[HttpPost]
	[Route("phiApi/[controller]/GetSaveIndexes")]
	[ProducesResponseType<Response<List<SaveTimeIndex>>>(StatusCodes.Status200OK)]
	[ProducesErrorResponseType(typeof(Response<ErrorData>))]
	[Consumes(MediaTypeNames.Text.Plain)]
	public async Task<IActionResult> GetSaveIndexes(bool isInternational, [FromBody] string token)
	{
		(IActionResult? action, Save? save) = await this.GetSaveAndHandleError(token, isInternational);
		if (save is null)
			return action!;

		List<SaveTimeIndex> timeList = [];
		try
		{
			SaveInfoContainer container = await save.GetSaveInfoFromCloudAsync();
			int index = 0;
			foreach (SaveInfo item in container.Results)
			{
				timeList.Add(new(index, item.ModifiedAt.Time));
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

	[HttpPost]
	[Route("phiApi/[controller]/GetSaveData")]
	[ProducesResponseType<Response<SaveData>>(StatusCodes.Status200OK)]
	[ProducesErrorResponseType(typeof(Response<ErrorData>))]
	[Consumes(MediaTypeNames.Text.Plain)]
	public async Task<IActionResult> GetSaveData(int index, bool isInternational, [FromBody] string token)
	{
		(IActionResult? action, Save? save) = await this.GetSaveAndHandleError(token, isInternational);
		if (save is null)
			return action!;

		GameProgress progress;
		GameSettings settings;
		GameUserInfo userInfo;
		Summary summary;
		PlayerInfo playerInfo;
		try
		{
			SaveContext context = await save.GetSaveContextAsync(index);
			playerInfo = await save.GetPlayerInfoAsync();
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
		return this.Json(new SaveData(progress, settings, userInfo, playerInfo, summary));
	}

	[HttpPost]
	[Route("phiApi/[controller]/GetDecryptedZip")]
	[ProducesResponseType<FileResult>(StatusCodes.Status200OK, MediaTypeNames.Application.Zip)]
	[ProducesErrorResponseType(typeof(Response<ErrorData>))]
	[Consumes(MediaTypeNames.Text.Plain)]
	public async Task<IActionResult> GetDecryptedZip(int index, bool isInternational, [FromBody] string token)
	{
		(IActionResult? action, Save? save) = await this.GetSaveAndHandleError(token, isInternational);
		if (save is null)
			return action!;

		using MemoryStream newStream = new();
		ZipArchive newZip = new(newStream, ZipArchiveMode.Create);
		try
		{
			byte[] d = await save.GetSaveZipAsync((await save.GetSaveInfoFromCloudAsync()).GetParsedSaves()[index]);

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

	[HttpPost]
	[Route("phiApi/[controller]/GetRecords")]
	[ProducesResponseType<Response<GameRecord>>(StatusCodes.Status200OK)]
	[ProducesErrorResponseType(typeof(Response<ErrorData>))]
	[Consumes(MediaTypeNames.Text.Plain)]
	public async Task<IActionResult> GetRecords(int index, bool isInternational, [FromBody] string token)
	{
		(IActionResult? action, Save? save) = await this.GetSaveAndHandleError(token, isInternational);
		if (save is null)
			return action!;

		try
		{
			SaveContext context = await save.GetSaveContextAsync(index);
			List<CompleteScore> records = context.ReadGameRecord()
				.GetCompleteScores(this._phigrosData.ChartConstantMap, this._phigrosData.NameMap)
				.ToList();

			this._logger.LogDebug("{ip} requested summary and save successfully.", this.IP);
			return this.Json(records);
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
