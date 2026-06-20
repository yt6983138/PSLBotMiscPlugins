using AdminHelper.Services;

namespace AdminHelper.Commands;

[AddToGlobal]
public class ToggleMaintenanceCommand : AdminCommandBase
{
	private readonly StatusService _statusService;

	public ToggleMaintenanceCommand(IServiceProvider provider, StatusService statusService)
		: base(provider)
	{
		this._statusService = statusService;
	}

	public override bool IsEphemeral => false;
	public override InteractionContextType[] InteractionContextTypes =>
	[
		InteractionContextType.Guild,
		InteractionContextType.BotDm,
		InteractionContextType.PrivateChannel
	];

	public override OneOf<string, LocalizedString> PSLName => "toggle-maintenance";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] Toggle maintenance.";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder;

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		this._statusService.CurrentStatus =
			this._statusService.CurrentStatus == Status.UnderMaintenance
				? Status.Normal
				: Status.UnderMaintenance;

		await arg.QuickReply($"Operation done successfully, current status: {this._statusService.CurrentStatus}");
	}
}

