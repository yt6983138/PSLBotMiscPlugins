using PSLDiscordBot.Core;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.MiscEventArgs;
using SmartFormat;

namespace AdminHelper.Services;

public record class StatusChangeEventArgs(Status OldStatus, Status NewStatus, DateTimeOffset LastStatusChangeTime);
public enum Status
{
	Normal,
	UnderMaintenance,
	ShuttingDown,
	UpdatingData
}
public class StatusService
{
	private static EventId EventId = new(114514_114, nameof(StatusService));
	private bool _detached = false;

	private readonly IOptions<AdminConfig> _adminConfig;
	private readonly IOptions<Config> _config;
	private readonly ICommandResolveService _commandResolveService;
	private readonly ILogger<StatusService> _logger;

	public Status CurrentStatus
	{
		get;
		set
		{
			Status oldStatus = field;
			DateTimeOffset oldTime = this.LastStatusChangeTime;
			if (oldStatus == value) return;

			field = value;
			this.LastStatusChangeTime = DateTimeOffset.UtcNow;
			StatusChanged?.Invoke(this, new(oldStatus, value, oldTime));
		}
	} = Status.Normal;
	public DateTimeOffset LastStatusChangeTime { get; private set; }

	public event EventHandler<StatusChangeEventArgs>? StatusChanged;

	public StatusService(IOptions<Config> config, IOptions<AdminConfig> adminConfig, ICommandResolveService commandResolver, ILogger<StatusService> logger)
	{
		this._config = config;
		this._adminConfig = adminConfig;
		this._commandResolveService = commandResolver;
		this._logger = logger;

		this._commandResolveService.BeforeSlashCommandExecutes += this.BeforeSlashCommandExecutes;
	}

	public void ForceDetach()
	{
		if (this._detached)
			return;
		this._commandResolveService!.BeforeSlashCommandExecutes -= this.BeforeSlashCommandExecutes;
		this._detached = true;
	}

	private async Task BeforeSlashCommandExecutes(object? sender, SlashCommandEventArgs e)
	{
		if (this.CurrentStatus != Status.Normal
			&& e.SocketSlashCommand.User.Id != this._config.Value.AdminUserId)
		{
			SocketSlashCommand arg = e.SocketSlashCommand;

			e.Canceled = true;
			string message = this.CurrentStatus switch
			{
				Status.UnderMaintenance => this._adminConfig.Value.MaintenanceResponse,
				Status.ShuttingDown => this._adminConfig.Value.ShutdownResponse,
				Status.UpdatingData => this._adminConfig.Value.UpdateDataResponse,
				_ => "<unknown error>"
			};
			message = Smart.Format(message, new
			{
				Arg = arg,
				this._config.Value.AdminUserId,
				this.LastStatusChangeTime,
			});

			try
			{
				await e.SocketSlashCommand.RespondAsync(message, ephemeral: true);
				this._logger.LogInformation(EventId, "Blocked command {cmd} from {name}({id})", arg.CommandName, arg.User.GlobalName, arg.User.Id);
			}
			catch (Exception ex)
			{
				this._logger.LogWarning(ex, "Failed to send maintenance message to {name}({id})", arg.User.GlobalName, arg.User.Id);
			}
			return;
		}
	}
}
