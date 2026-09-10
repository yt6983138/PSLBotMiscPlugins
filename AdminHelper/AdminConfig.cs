namespace AdminHelper;
public class AdminConfig
{
	public LocalizedString BlackListedDefaultMessage { get; set; } = LocalizedString.CreateDefault("Oops, something is wrong!");

	public long MvcSuperSecretNumber { get; set; }
#if DEBUG
		= Secret.MyExtremelyImportantSecretThatCannotBeTrackedSoIMadeItInAnotherClassAndIDKWhyIAmMakingTheNameSoLong;
#else
		= Random.Shared.NextInt64();
#endif

	public string TimedBackupDestination { get; set; } = "./Backup/{0}_Timed";
	public string StartupBackupDestination { get; set; } = "./Backup/{0}_Startup/";

	public List<string> TimedBackupSources { get; set; } =
	[
		//"./PSL/",
		//"./MiscPlugins/"
	];
	public List<string> StartupBackupSources { get; set; } =
	[
		//"./PSL/",
		//"./MiscPlugins/",
		//"./Plugins/"
	];

	public TimeSpan TimedBackupInterval { get; set; } = new(6, 0, 0); // set to 0 to disable
	public bool DoStartupBackup { get; set; } = true;

	public ulong NotificationGuildId { get; set; } = 1165154972665659412;
	public ulong NotificationChannelId { get; set; } = 1547225620365312120;

	public string? ShutdownNotification { get; set; } = "The bot is shutting down. <@&1547241301462749224>";
	public string? MaintenanceNotification { get; set; } = "The bot is now under maintenance. <@&1547241301462749224>";
	public string? MaintenanceEndNotification { get; set; } = "The bot is back to normal, maintenance started at <t:{LastStatusChangeTime.ToUnixTimeMilliseconds:calc(/1000)}:f>, spent {TimeSpan}. <@&1547241301462749224>";
	public string? ShutdownCanceledNotification { get; set; } = null;
	public string? UpdateDataNotification { get; set; } = "The bot is updating assets from TapTap, this may take a while... <@&1547241301462749224>";
	public string? UpdateDataEndNotification { get; set; } = "The bot has finished updating assets. <@&1547241301462749224>";
	public string? BotRestartedNotification { get; set; } = "The bot has restarted. <@&1547241301462749224>";

	public string MaintenanceResponse { get; set; } = "The bot is under maintenance since <t:{LastStatusChangeTime.ToUnixTimeMilliseconds:calc(/1000)}:f>. You may try again later.";
	public string ShutdownResponse { get; set; } = "The service is shutting down. The service may be up later.";
	public string UpdateDataResponse { get; set; } = "The bot is updating assets. You may try again later.";
}
