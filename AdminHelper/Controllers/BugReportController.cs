using AdminHelper.Models;
using AdminHelper.Services;
using Discord;
using Discord.Rest;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Framework.BuiltInServices;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json;

namespace AdminHelper.Controllers;

public class BugReportController : Controller
{
	private static JsonSerializerOptions _jsonOptions = new(JsonSerializerDefaults.Web);

	private readonly BugReportDatabaseService _databaseService;
	private readonly IDiscordClientService _discordClientService;
	private readonly AdminConfig _adminConfig;

	public BugReportController(BugReportDatabaseService databaseService, IDiscordClientService discordClientService, IOptions<AdminConfig> adminConfig)
	{
		this._databaseService = databaseService;
		this._discordClientService = discordClientService;
		this._adminConfig = adminConfig.Value;
	}

	public override JsonResult Json(object? data)
	{
		return base.Json(data, _jsonOptions);
	}
	private async Task<T> GetRequestBodyAsJson<T>()
	{
		using StreamReader reader = new(this.Request.Body);
		string body = await reader.ReadToEndAsync();
		return JsonSerializer.Deserialize<T>(body, _jsonOptions)
			?? throw new InvalidOperationException("Failed to deserialize request body.");
	}
	private bool HasBadAuth([NotNullWhen(true)] out IActionResult? error)
	{
		if (!this.Request.Headers.TryGetValue("Authorization", out Microsoft.Extensions.Primitives.StringValues authHeader)
			|| authHeader != this._adminConfig.MvcSuperSecretNumber.ToString())
		{
			error = this.Unauthorized("Invalid or missing authorization header.");
			return true;
		}
		error = null;
		return false;
	}

	[HttpGet("/api/reports/reports")]
	public async Task<IActionResult> GetReports(int previewLength = 32)
	{
		if (this.HasBadAuth(out IActionResult? error)) return error;

		using BugReportDatabaseService.BugReportRequester requester = this._databaseService.GetNewRequester();

		return this.Json(await requester.ReportMessages
			.AsNoTracking()
			.Select(x => new
			{
				x.Id,
				x.AuthorId,
				x.RecipientId,
				x.Status,
				x.TimeStamp,
				Preview = x.Content.Substring(0, previewLength),
			}).ToArrayAsync());
	}
	[HttpGet("/api/reports/detailed")]
	public async Task<IActionResult> GetReportDetailed(int id)
	{
		if (this.HasBadAuth(out IActionResult? error)) return error;

		using BugReportDatabaseService.BugReportRequester requester = this._databaseService.GetNewRequester();

		ReportMessage? message = await requester.ReportMessages
			.AsNoTracking()
			.FirstOrDefaultAsync(x => x.Id == id);

		if (message is null)
			return this.NotFound("Specified report is not found.");

		return this.Json(new
		{
			message.Id,
			message.AuthorId,
			message.RecipientId,
			message.Content,
			message.Attachments,
			message.Status,
			message.TimeStamp,

			AuthorName = message.AuthorId is null ? null : (await this._discordClientService.RestClient.GetUserAsync((ulong)message.AuthorId))?.GlobalName,
			RecipientName = message.RecipientId is null ? null : (await this._discordClientService.RestClient.GetUserAsync((ulong)message.RecipientId))?.GlobalName,
		});
	}
	[HttpGet("/api/reports/attachment")]
	public IActionResult GetAttachment(string hash)
	{
		if (this.HasBadAuth(out IActionResult? error)) return error;

		if (!hash.All(char.IsAsciiHexDigit))
			return this.BadRequest("Hash contains invalid characters.");

		string path = Path.Combine(this._databaseService.AttachmentDirectory.FullName, hash);
		if (!System.IO.File.Exists(path))
			return this.NotFound("Attachment not found.");

		return this.PhysicalFile(path, "application/octet-stream", enableRangeProcessing: true);
	}
	[HttpPost("/api/reports/send")]
	public async Task<IActionResult> SendMessageAsync()
	{
		if (this.HasBadAuth(out IActionResult? error)) return error;

		using BugReportDatabaseService.BugReportRequester requester = this._databaseService.GetNewRequester();

		SendMessageDto messageDto = await this.GetRequestBodyAsJson<SendMessageDto>();

		RestUser user = await this._discordClientService.RestClient.GetUserAsync(messageDto.RecipientId);
		if (user is null)
			return this.BadRequest("Recipient user not found.");

		IUserMessage message = await user.SendFilesAsync(
			messageDto.Attachments
				.Select(x => new FileAttachment(new MemoryStream(Convert.FromBase64String(x.Base64Content)), x.FileName)),
			messageDto.Content);

		await requester.AddMessage(
			null,
			messageDto.RecipientId,
			message.Id,
			DateTime.Now,
			messageDto.Content,
			ReportFlag.SentByUs,
			messageDto.Attachments.Select(x => (Convert.FromBase64String(x.Base64Content), x.FileName)).ToArray());
		await requester.SaveChangesAsync();

		return this.Ok();
	}
	[HttpPatch("/api/reports/updateStatus")]
	public async Task<IActionResult> UpdateReportStatus(long id, ReportFlag newStatus)
	{
		if (this.HasBadAuth(out IActionResult? error)) return error;

		using BugReportDatabaseService.BugReportRequester requester = this._databaseService.GetNewRequester();

		ReportMessage? message = await requester.ReportMessages.FirstOrDefaultAsync(x => x.Id == id);
		if (message is null)
			return this.NotFound("Report message not found.");

		message.Status = newStatus;
		await requester.SaveChangesAsync();

		return this.Ok();
	}
}
