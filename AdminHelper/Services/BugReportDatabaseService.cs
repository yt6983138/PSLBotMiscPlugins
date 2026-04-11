using AdminHelper.Models;
using Discord;
using Discord.WebSocket;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core.Services;
using System.Security.Cryptography;

namespace AdminHelper.Services;

public sealed class BugReportDatabaseService : DbContext
{
	public DirectoryInfo DatabaseDirectory { get; private set; }
	public DirectoryInfo AttachmentDirectory { get; private set; }

	/// <summary>
	/// this contains messages user sent to us or we sent to user
	/// </summary>
	public DbSet<ReportMessage> ReportMessages { get; set; }

	public BugReportDatabaseService(BugReportHandlerService handler, IOptions<AdminConfig> config)
	{
		this.DatabaseDirectory = Directory.CreateDirectory("BugReports");
		this.AttachmentDirectory = this.DatabaseDirectory.CreateSubdirectory("Attachments");

		handler.OnReportReceived += this.Handler_OnReportReceived;
		this.Database.EnsureCreated();
	}

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		optionsBuilder.UseSqlite($"Data Source={Path.Combine(this.DatabaseDirectory.FullName, "Messages.db")}");
	}

	private async Task Handler_OnReportReceived(SocketUser user, string reportContent, IAttachment[] attachments)
	{
		using HttpClient client = new();

		await this.AddMessage(
			user.Id,
			null,
			null,
			DateTime.Now,
			reportContent,
			ReportFlag.Unread,
			attachments.Select(x => (client.GetByteArrayAsync(x.Url).GetAwaiter().GetResult(), x.Filename)).ToArray());

		await this.SaveChangesAsync();
	}

	public async Task AddMessage(
		ulong? authorId,
		ulong? recipientId,
		ulong? messageId,
		DateTime timeStamp,
		string content,
		ReportFlag status,
		params ReportMessage.AttachmentInfo[] attachments)
	{
		await this.ReportMessages.AddAsync(new(0, (long?)authorId, (long?)recipientId, (long?)messageId, timeStamp, content, status, attachments));
	}

	public async Task AddMessage(
		ulong? authorId,
		ulong? recipientId,
		ulong? messageId,
		DateTime timeStamp,
		string content,
		ReportFlag status,
		params (byte[] Data, string FileName)[] attachments)
	{
		List<ReportMessage.AttachmentInfo> attachmentInfos = [];
		foreach ((byte[]? data, string? fileName) in attachments)
		{
			string hash = Convert.ToHexString(SHA1.HashData(data));
			attachmentInfos.Add(new(hash, fileName));
			await File.WriteAllBytesAsync(Path.Combine(this.AttachmentDirectory.FullName, hash), data);
		}

		await this.ReportMessages.AddAsync(new(0, (long?)authorId, (long?)recipientId, (long?)messageId, timeStamp, content, status, attachmentInfos.ToArray()));
	}
}
