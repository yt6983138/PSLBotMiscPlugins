﻿using Microsoft.AspNetCore.Mvc;
using PhigrosLibraryCSharp;
using PhigrosLibraryCSharp.Cloud.DataStructure;
using PhigrosLibraryCSharp.Cloud.DataStructure.Raw;
using PSLDiscordBot.Core.Services.Phigros;
using System.Collections.Concurrent;
using System.IO.Compression;

namespace PhigrosApi.Controllers;
public class CloudSaveController : Controller
{
	public static ConcurrentDictionary<string, Save> TokenSaveCache { get; set; } = new();

	private ILogger<CloudSaveController> _logger;
	private PhigrosDataService _phigrosData;

	public CloudSaveController(ILogger<CloudSaveController> logger, PhigrosDataService data)
	{
		this._logger = logger;
		this._phigrosData = data;
	}

	private async Task<Save> GetSaveOrAdd(string token)
	{
		if (TokenSaveCache.TryGetValue(token, out Save? save))
			return save;

		Save newSave = new(token); // will throw if invalid token
		await newSave.GetUserInfoAsync();
		this._logger.LogDebug("Adding token {token} to cache", token);
		return !TokenSaveCache.TryAdd(token, newSave) ? throw new Exception("Failed to add to cache") : newSave;
	}
	private async Task<(IActionResult?, Save?)> GetSaveAndHandleError(string token)
	{
		Save save;
		try
		{
			save = await this.GetSaveOrAdd(token);
		}
		catch (ArgumentException argEx)
		{
			return (this.Error(this._logger, argEx.Message, code: ErrorCode.PhigrosTokenError), null);
		}
		catch (HttpRequestException argEx)
		{
			return (this.Error(this._logger, argEx.Message, code: ErrorCode.PhigrosTokenError), null);
		}
		catch (Exception ex)
		{
			return (this.Error(this._logger, ex.Message, code: ErrorCode.PhigrosLibraryInternalError), null);
		}

		return (null, save);
	}

	[HttpPost]
	[Route("phiApi/[controller]/GetSaveIndexes")]
	public async Task<IActionResult> GetSaveIndexes()
	{
		(IActionResult? action, Save? save) = await this.GetSaveAndHandleError(await this.Request.ReadBodyAsString());
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
			return this.Error(this._logger, ex.Message, code: ErrorCode.PhigrosLibraryInternalError);
		}

		this._logger.LogDebug("{ip} requested save index successfully.", this.Request.HttpContext.GetIP());
		return this.Json(timeList);
	}

	[HttpPost]
	[Route("phiApi/[controller]/GetGameUserInfo/{id=0}")]
	public async Task<IActionResult> GetGameUserInfo(int id)
	{
		(IActionResult? action, Save? save) = await this.GetSaveAndHandleError(await this.Request.ReadBodyAsString());
		if (save is null)
			return action!;

		GameUserInfo userInfo;
		try
		{
			userInfo = await save.GetGameUserInfoAsync(id);
		}
		catch (ArgumentOutOfRangeException ex)
		{
			return this.Error(this._logger, ex.Message, code: ErrorCode.ArgumentOutOfRange);
		}
		catch (Exception ex)
		{
			return this.Error(this._logger, ex.Message, code: ErrorCode.PhigrosLibraryInternalError);
		}

		this._logger.LogDebug("{ip} requested game user info successfully.", this.Request.HttpContext.GetIP());
		return this.Json(userInfo);
	}

	[HttpPost]
	[Route("phiApi/[controller]/GetGameSettings/{id=0}")]
	public async Task<IActionResult> GetGameSettings(int id)
	{
		(IActionResult? action, Save? save) = await this.GetSaveAndHandleError(await this.Request.ReadBodyAsString());
		if (save is null)
			return action!;

		GameSettings data;
		try
		{
			data = await save.GetGameSettingsAsync(id);
		}
		catch (ArgumentOutOfRangeException ex)
		{
			return this.Error(this._logger, ex.Message, code: ErrorCode.ArgumentOutOfRange);
		}
		catch (Exception ex)
		{
			return this.Error(this._logger, ex.Message, code: ErrorCode.PhigrosLibraryInternalError);
		}

		this._logger.LogDebug("{ip} requested game settings successfully.", this.Request.HttpContext.GetIP());
		return this.Json(data);
	}

	[HttpPost]
	[Route("phiApi/[controller]/GetGameProgress/{id=0}")]
	public async Task<IActionResult> GetGameProgress(int id)
	{
		(IActionResult? action, Save? save) = await this.GetSaveAndHandleError(await this.Request.ReadBodyAsString());
		if (save is null)
			return action!;

		GameProgress data;
		try
		{
			data = await save.GetGameProgressAsync(id);
		}
		catch (ArgumentOutOfRangeException ex)
		{
			return this.Error(this._logger, ex.Message, code: ErrorCode.ArgumentOutOfRange);
		}
		catch (Exception ex)
		{
			return this.Error(this._logger, ex.Message, code: ErrorCode.PhigrosLibraryInternalError);
		}

		this._logger.LogDebug("{ip} requested game progress successfully.", this.Request.HttpContext.GetIP());
		return this.Json(data);
	}

	[HttpPost]
	[Route("phiApi/[controller]/GetDecryptedZip/{id=0}")]
	public async Task<IActionResult> GetDecryptedZip(int id)
	{
		(IActionResult? action, Save? save) = await this.GetSaveAndHandleError(await this.Request.ReadBodyAsString());
		if (save is null)
			return action!;

		using MemoryStream newStream = new();
		ZipArchive newZip = new(newStream, ZipArchiveMode.Create);
		try
		{
			byte[] d = await save.GetSaveRawZipAsync((await save.GetRawSaveFromCloudAsync()).GetParsedSaves()[id]);

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
			return this.Error(this._logger, ex.Message, code: ErrorCode.ArgumentOutOfRange);
		}
		catch (Exception ex)
		{
			return this.Error(this._logger, ex.Message, code: ErrorCode.PhigrosLibraryInternalError);
		}

		this._logger.LogDebug("{ip} requested decrypted zip successfully.", this.Request.HttpContext.GetIP());
		return this.File(newStream.ToArray(), "application/zip");
	}

	[HttpPost]
	[Route("phiApi/[controller]/GetSaveAndSummary/{id=0}")]
	public async Task<IActionResult> GetSaveAndSummary(int id)
	{
		(IActionResult? action, Save? save) = await this.GetSaveAndHandleError(await this.Request.ReadBodyAsString());
		if (save is null)
			return action!;

		Summary summary;
		GameSave gameSave;

		object converted;
		try
		{
			(summary, gameSave) = await save.GetGameSaveAsync(this._phigrosData.DifficultiesMap, id);

			converted = new
			{
				Summary = summary,
				GameSave = new
				{
					gameSave.CreationDate,
					gameSave.ModificationTime,
					Records = gameSave.Records.Select(r => r.Export(this._phigrosData.IdNameMap[r.Id]))
				}
			};
		}
		catch (ArgumentOutOfRangeException ex)
		{
			return this.Error(this._logger, ex.Message, code: ErrorCode.ArgumentOutOfRange);
		}
		catch (Exception ex)
		{
			return this.Error(this._logger, ex.Message, code: ErrorCode.PhigrosLibraryInternalError);
		}

		this._logger.LogDebug("{ip} requested summary and save successfully.", this.Request.HttpContext.GetIP());
		return this.Json(converted);
	}
}
