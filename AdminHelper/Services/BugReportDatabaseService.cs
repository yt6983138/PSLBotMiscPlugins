using AdminHelper.Models;
using Discord;
using Discord.WebSocket;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core.Services;
using System.Security.Cryptography;

namespace AdminHelper.Services;

public sealed class BugReportDatabaseService : IDisposable
{
	private readonly BugReportHandlerService _bugReportHandlerService;
	private readonly IOptions<AdminConfig> _config;

	public DirectoryInfo DatabaseDirectory { get; private set; }
	public DirectoryInfo AttachmentDirectory { get; private set; }

	public BugReportDatabaseService(BugReportHandlerService bugReportHandlerService, IOptions<AdminConfig> config)
	{
		this._bugReportHandlerService = bugReportHandlerService;
		this._config = config;

		this._bugReportHandlerService.OnReportReceived += this.Handler_OnReportReceived;

		this.DatabaseDirectory = Directory.CreateDirectory("Administration/BugReports");
		this.AttachmentDirectory = this.DatabaseDirectory.CreateSubdirectory("Attachments");
	}

	private async Task Handler_OnReportReceived(SocketUser user, string reportContent, IAttachment[] attachments)
	{
		using HttpClient client = new();
		using BugReportRequester requester = this.GetNewRequester();

		await requester.AddMessage(
			user.Id,
			null,
			null,
			DateTime.Now,
			reportContent,
			ReportFlag.Unread,
			attachments.Select(x => (client.GetByteArrayAsync(x.Url).GetAwaiter().GetResult(), x.Filename)).ToArray());

		await requester.SaveChangesAsync();
	}

	public BugReportRequester GetNewRequester()
	{
		return new(this._config, this);
	}

	~BugReportDatabaseService()
	{
		this.Dispose();
	}
	public void Dispose()
	{
		GC.SuppressFinalize(this);
		this._bugReportHandlerService.OnReportReceived -= this.Handler_OnReportReceived;
	}

	public sealed class BugReportRequester : DbContext
	{
		private readonly BugReportDatabaseService _parent;

		/// <summary>
		/// this contains messages user sent to us or we sent to user
		/// </summary>
		public DbSet<ReportMessage> ReportMessages { get; set; }

		internal BugReportRequester(IOptions<AdminConfig> config, BugReportDatabaseService parent)
		{
			this._parent = parent;
			this.Database.EnsureCreated();
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlite($"Data Source={Path.Combine(this._parent.DatabaseDirectory.FullName, "Messages.db")}");
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
				await File.WriteAllBytesAsync(Path.Combine(this._parent.AttachmentDirectory.FullName, hash), data);
			}

			await this.ReportMessages.AddAsync(new(0, (long?)authorId, (long?)recipientId, (long?)messageId, timeStamp, content, status, attachmentInfos.ToArray()));
		}
	}
}