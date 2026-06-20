using AdminHelper.Services;

namespace AdminHelper.Commands;

[AddToGlobal]
public class CancelCommand : AdminCommandBase
{
	private readonly StatusService _statusService;

	public CancelCommand(IServiceProvider provider, StatusService statusService)
		: base(provider)
	{
		this._statusService = statusService;
	}

	public override OneOf<string, LocalizedString> PSLName => "admin-cancel";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] Cancel last admin operation.";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder;

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		this._statusService.CurrentStatus = Status.Normal;

		await arg.QuickReply("Operation canceled successfully.");
	}
}

