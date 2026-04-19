using AdminHelper.Services;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;

namespace AdminHelper;

public class AdminHelperPlugin : IPlugin
{
	private static readonly EventId EventId = new(114514_110, nameof(AdminHelperPlugin));

	private CommandStatisticsService _commandStatisticsService = null!;
	private ICommandResolveService _commandResolveService = null!;
	private StatusService _statusService = null!;
	private Program _program = null!;
	private PSLPlugin _pslPlugin = null!;

	private bool _hasOtherRegisteredMvc = false;

	string IPlugin.Name => "Admin helper";
	string IPlugin.Description => "Help admins do shit";
	Version IPlugin.Version => new(1, 1, 0, 0);
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => 114514_1;

	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;

	public string FormattedTimedDestination =>
		string.Format(this.Config.Value.TimedBackupDestination, DateTime.Now.ToString("s")).Replace(':', '_');
	public string FormattedStartupDestination =>
		string.Format(this.Config.Value.StartupBackupDestination, DateTime.Now.ToString("s")).Replace(':', '_');

	public ILogger<AdminHelperPlugin> Logger { get; private set; } = null!;
	public IOptions<AdminConfig> Config { get; private set; } = null!;
	public Timer? BackupTimer { get; private set; }

	void IPlugin.Load(WebApplicationBuilder hostBuilder, bool isDynamicLoading)
	{
		hostBuilder.Services.Configure<AdminConfig>(
			hostBuilder.Configuration.GetSection("AdminConfig"));
		hostBuilder.Services.AddSingleton<BlackListService>()
			.AddSingleton<CommandStatisticsService>()
			.AddSingleton<StatusService>()
			.AddSingleton<BugReportDatabaseService>();
		// i know it should be scoped or transient but commands are singletons, so it will be singleton eventually

		this._hasOtherRegisteredMvc = hostBuilder.Services.HasMvcRegistered();
		if (!this._hasOtherRegisteredMvc)
		{
			hostBuilder.Services.AddMvc();
		}

		hostBuilder.Services.GetApplicationPartManager()
			.ApplicationParts.Add(new AssemblyPart(typeof(AdminHelperPlugin).Assembly));

		Console.CancelKeyPress += this.Console_CancelKeyPress;
	}

	void IPlugin.Setup(IHost host)
	{
		this._commandStatisticsService = host.Services.GetRequiredService<CommandStatisticsService>();
		this._commandResolveService = host.Services.GetRequiredService<ICommandResolveService>();
		this._statusService = host.Services.GetRequiredService<StatusService>();
		this._program = host.Services.GetRequiredService<Program>();
		this._pslPlugin = host.Services.GetRequiredService<PSLPlugin>();

		host.Services.GetRequiredService<BugReportHandlerService>().OnReportReceived += this.AdminHelperPlugin_OnReportReceived;

		host.Services.GetRequiredService<BugReportDatabaseService>();
		host.Services.GetRequiredService<BlackListService>();
		// make sure the event handler is registered before any command executes

		this._commandResolveService.BeforeSlashCommandExecutes += this.CommandResolveService_BeforeSlashCommandExecutes;

		this.Logger = host.Services.GetRequiredService<ILogger<AdminHelperPlugin>>();
		this.Config = host.Services.GetRequiredService<IOptions<AdminConfig>>();

		if (!this._hasOtherRegisteredMvc)
		{
			WebApplication app = (WebApplication)host;

			app.MapControllers().AllowAnonymous();
			app.UseRouting();
			app.UseAuthorization();
			app.UseStaticFiles(new StaticFileOptions()
			{
				ServeUnknownFileTypes = true
			});
		}

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
		return this._pslPlugin.AdminDM?.SendMessageAsync($"You have a new bug report. Preview: {reportContent[..32]}...")
			?? Task.CompletedTask;
	}

	void IPlugin.Unload(IHost host, bool isDynamicUnloading)
	{
	}

#if DEBUG
	private class DiscordClient : IDiscordClientService
	{
		public required DiscordSocketClient SocketClient { get; set; }
		public required DiscordRestClient RestClient { get; set; }
		public string Token { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

		public bool HasStartedSuccessfully => throw new NotImplementedException();

		public Task StartBotAsync(bool failOnAlreadyStarted = false)
		{
			throw new NotImplementedException();
		}

		public Task<bool> TryStartBotAsync(bool failOnAlreadyStarted = false)
		{
			throw new NotImplementedException();
		}
	}
	public static void Main(string[] args)
	{
		WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

		// Add services to the container.
		builder.Services.AddSingleton<BugReportDatabaseService>()
			.AddSingleton<BugReportHandlerService>();

		DiscordClient client = new()
		{
			RestClient = new(),
			SocketClient = new()
		};
		client.RestClient.LoginAsync(Discord.TokenType.Bot, Secret.Token).Wait();

		builder.Services.AddSingleton<IDiscordClientService>(new DiscordClient() { RestClient = new(new()), SocketClient = new() });

		builder.Services.Configure<AdminConfig>(
			builder.Configuration.GetSection("AdminConfig"));

		builder.Services.AddControllersWithViews()
			.AddJsonOptions(x => x.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower);

		WebApplication app = builder.Build();

		// Configure the HTTP request pipeline.
		if (!app.Environment.IsDevelopment())
		{
			app.UseExceptionHandler("/Home/Error");
		}
		app.MapControllers().AllowAnonymous();

		app.UseStaticFiles(new StaticFileOptions()
		{
			ServeUnknownFileTypes = true
		});

		app.UseRouting();

		app.UseAuthorization();

		app.Run();
	}
#else
	public static void Main() { }
#endif

	private async void CommandResolveService_BeforeSlashCommandExecutes(object? sender, PSLDiscordBot.Framework.MiscEventArgs.SlashCommandEventArgs e)
	{
		if (e.Canceled) return;

		CommandStatisticInfo info = await this._commandStatisticsService.GetOrAddNew(e.SocketSlashCommand.CommandName);
		info.UseCount++;
		await this._commandStatisticsService.SaveChangesAsync();
	}
	private void Console_CancelKeyPress(object? sender, ConsoleCancelEventArgs e)
	{
		bool @break = e.SpecialKey == ConsoleSpecialKey.ControlBreak;
		if (@break)
		{
			this.Logger.LogCritical(EventId, "Hard terminating application. (Ctrl-C to soft terminate)");
			Environment.FailFast("Ctrl-break triggered, hard terminating.");
			return;
		}

		e.Cancel = true;
		this._statusService.CurrentStatus = Status.ShuttingDown;
		this.Logger.LogInformation(EventId, "Soft terminate initialized. (Ctrl-break to hard terminate)");
		while (this._program.RunningTasks.Count > 0)
		{
			Thread.Sleep(500);
			this.Logger.LogInformation(EventId, "{count} tasks running...", this._program.RunningTasks.Count);

			if (this._statusService.CurrentStatus == Status.Normal)
			{
				this.Logger.LogInformation(EventId, "Operation canceled.");
				this.Logger.LogInformation(EventId, "Operation canceled.");
				return;
			}
		}

		this._program.CancellationTokenSource.Cancel();
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
					fi.CopyTo(folder, true);
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
