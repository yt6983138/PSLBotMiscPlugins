using AdminHelper.Services;
using PSLDiscordBot.Core;
using PSLDiscordBot.Framework.BuiltInServices;

namespace AdminHelper;

public class AdminHelperPlugin : IPlugin<AdminHelperPlugin>
{
	private static readonly EventId EventId = new(114514_110, nameof(AdminHelperPlugin));

	private readonly CommandStatisticsService _commandStatisticsService;
	private readonly ICommandResolveService _commandResolveService;
	private readonly StatusService _statusService;
	private readonly ILifetimeService _lifetimeService;
	private readonly ShutdownService _shutdownService;
	private readonly AdminContactService _adminContact;
	private readonly MaintenanceNotificationService _notificationService;

	public static string Name => "Admin helper";
	public static string Description => "Help admins do shit";
	public static string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public static int Priority => 114514_1;

	public string FormattedTimedDestination =>
		string.Format(this.Config.Value.TimedBackupDestination, DateTime.Now.ToString("s")).Replace(':', '_');
	public string FormattedStartupDestination =>
		string.Format(this.Config.Value.StartupBackupDestination, DateTime.Now.ToString("s")).Replace(':', '_');

	public ILogger<AdminHelperPlugin> Logger { get; }
	public IOptions<AdminConfig> Config { get; }
	public Timer? BackupTimer { get; private set; }

	private AdminHelperPlugin(
		CommandStatisticsService commandStatisticsService,
		ICommandResolveService commandResolveService,
		StatusService statusService,
		ILifetimeService lifetimeService,
		ShutdownService shutdownService,
		AdminContactService adminContact,
		MaintenanceNotificationService notificationService,
		ILogger<AdminHelperPlugin> logger,
		IOptions<AdminConfig> config)
	{
		this._commandStatisticsService = commandStatisticsService;
		this._commandResolveService = commandResolveService;
		this._statusService = statusService;
		this._lifetimeService = lifetimeService;
		this._shutdownService = shutdownService;
		this._adminContact = adminContact;
		this._notificationService = notificationService;
		this.Logger = logger;
		this.Config = config;
	}

	public static Task Load(WebApplicationBuilder hostBuilder)
	{
		hostBuilder.Services.Configure<AdminConfig>(
			hostBuilder.Configuration.GetSection("AdminConfig"));
		hostBuilder.Services.AddSingleton<BlackListService>()
			.AddSingleton<CommandStatisticsService>()
			.AddSingleton<StatusService>()
			.AddSingleton<ShutdownService>()
			.AddSingleton<PhigrosDataUpdateService>()
			// i know it should be scoped or transient but commands are singletons, so it will be singleton eventually
			.AddSingleton<BugReportDatabaseService>()
			.AddSingleton<MaintenanceNotificationService>();

		hostBuilder.Services.AddAssemblyToMvc<AdminHelperPlugin>();
		return Task.CompletedTask;
	}
	public static Task<AdminHelperPlugin> Setup(WebApplication host)
	{
		// kinda feeling this is becoming a spaghetti, probably need to refactor this later

		AdminHelperPlugin plugin = new(
			host.Services.GetRequiredService<CommandStatisticsService>(),
			host.Services.GetRequiredService<ICommandResolveService>(),
			host.Services.GetRequiredService<StatusService>(),
			host.Services.GetRequiredService<ILifetimeService>(),
			host.Services.GetRequiredService<ShutdownService>(),
			host.Services.GetRequiredService<AdminContactService>(),
			host.Services.GetRequiredService<MaintenanceNotificationService>(),
			host.Services.GetRequiredService<ILogger<AdminHelperPlugin>>(),
			host.Services.GetRequiredService<IOptions<AdminConfig>>());
		plugin.Hook(host);
		return Task.FromResult(plugin);
	}
	private void Hook(WebApplication host)
	{
		this._lifetimeService.ShutdownRequested += this.LifetimeService_ShutdownRequested;
		this._lifetimeService.AfterMainInitialize += async (s, e) =>
		{
			try
			{
				await this._notificationService.ResolveChannelAsync();
				await this._notificationService.SendMessage(this.Config.Value.BotRestartedNotification, new(Status.Normal, Status.Normal, DateTimeOffset.UtcNow));
			}
			catch (Exception ex)
			{
				this.Logger.LogError(EventId, ex, "Failed to send bot restarted notification.");
			}
		};

		host.Services.GetRequiredService<BugReportHandlerService>().OnReportReceived += this.AdminHelperPlugin_OnReportReceived;

		host.Services.GetRequiredService<BugReportDatabaseService>();
		host.Services.GetRequiredService<BlackListService>();
		// make sure the event handler is registered before any command executes

		this._commandResolveService.BeforeSlashCommandExecutes += this.CommandResolveService_BeforeSlashCommandExecutes;

		host.Services.GetRequiredService<IMvcConfigurationService>().StaticFileOptions.ServeUnknownFileTypes = true;

		if (this.Config.Value.TimedBackupInterval != TimeSpan.Zero)
		{
			this.BackupTimer = new(
				this.TimedSave,
				null,
				this.Config.Value.TimedBackupInterval, // prevent being started immediately
				this.Config.Value.TimedBackupInterval);
		}
		if (this.Config.Value.DoStartupBackup)
		{
			this.Logger.LogInformation(EventId, "Startup backup begin.");
			this.SaveThings(this.FormattedStartupDestination, this.Config.Value.StartupBackupSources);
			this.Logger.LogInformation(EventId, "Startup backup ended.");
		}
	}

	private Task AdminHelperPlugin_OnReportReceived(Discord.WebSocket.SocketUser user, string reportContent, Discord.IAttachment[] attachments)
	{
		// assume the admin has already known that they did or did not setup admin user properly
		return this._adminContact.AdminDM?.SendMessageAsync($"You have a new bug report. Preview: {reportContent[..Math.Min(reportContent.Length, 32)]}...")
			?? Task.CompletedTask;
	}

	public Task Unload(WebApplication host, bool isSafeUnload)
	{
		this._statusService.ForceDetach();
		return Task.CompletedTask;
	}

	// placeholder for the compiler to not complain about no Main method, this is not used
	public static void Main() { }

	private async Task CommandResolveService_BeforeSlashCommandExecutes(object? sender, PSLDiscordBot.Framework.MiscEventArgs.SlashCommandEventArgs e)
	{
		if (e.Canceled) return;

		try
		{
			using CommandStatisticsService.Requester requester = this._commandStatisticsService.NewRequester();
			CommandStatisticInfo info = await requester.GetOrAddNew(e.SocketSlashCommand.CommandName);
			info.UseCount++;
			await requester.SaveChangesAsync();
		}
		catch (Exception ex)
		{
			this.Logger.LogError(EventId, ex, "Failed to update command statistics for command '{commandName}'.", e.SocketSlashCommand.CommandName);
		}
	}
	private async Task LifetimeService_ShutdownRequested(object? sender, EventArgs e)
	{
		// a drain started by /shutdown or the HTTP endpoint also counts, a canceled one (status Normal) does not
		if (this._shutdownService.IsShuttingDown)
		{
			this.Logger.LogInformation(EventId, "Shutdown already in progress, ignoring the signal.");
			return;
		}
		await this._shutdownService.RunAsync(0);
	}

	#region Backup related
	private void TimedSave(object? state)
	{
		this.Logger.LogInformation(EventId, "Timed backup begin.");
		this.SaveThings(this.FormattedTimedDestination, this.Config.Value.TimedBackupSources);
		this.Logger.LogInformation(EventId, "Timed backup ended.");
	}
	private void SaveThings(string dest, List<string> things)
	{
		List<FileSystemInfo> files = [];
		foreach (string item in things)
		{
			if (File.Exists(item))
			{
				files.Add(new FileInfo(item));
			}
			else if (Directory.Exists(item))
			{
				files.Add(new DirectoryInfo(item));
			}
			else
			{
				this.Logger.LogWarning(EventId, "Source backup file/folder '{item}' do not exist. Skipping.", item);
			}
		}

		foreach (FileSystemInfo file in files)
		{
			try
			{
				if (file is DirectoryInfo di)
				{
					CopyFolder(Path.Combine(dest, di.Name), di, true);
				}
				else if (file is FileInfo fi)
				{
					string folder = Path.Combine(dest, fi.Directory!.Name);
					Directory.CreateDirectory(folder);
					fi.CopyTo(Path.Combine(folder, fi.Name), true);
				}
				else
				{
					throw new ApplicationException("This should not happen");
				}
			}
			catch (Exception ex)
			{
				this.Logger.LogError(EventId, ex, "Failed to backup file/folder '{path}'.", file.FullName);
			}
		}

		static void CopyFolder(string dest, DirectoryInfo src, bool overwrite)
		{
			Directory.CreateDirectory(dest);
			foreach (FileInfo item in src.GetFiles())
			{
				item.CopyTo(Path.Combine(dest, item.Name), overwrite);
			}
			foreach (DirectoryInfo item in src.GetDirectories())
			{
				CopyFolder(Path.Combine(dest, item.Name), item, overwrite);
			}
		}
	}
	#endregion
}
