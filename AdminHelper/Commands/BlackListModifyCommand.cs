using AdminHelper.Models;
using AdminHelper.Services;

namespace AdminHelper.Commands;

[AddToGlobal]
public class BlackListModifyCommand : AdminCommandBase
{
	private enum Operation
	{
		Delete,
		Disable,
		Enable
	}

	private readonly BlackListService _blackListService;

	public BlackListModifyCommand(IServiceProvider provider, BlackListService blackListService)
		: base(provider)
	{
		this._blackListService = blackListService;
	}

	public override OneOf<string, LocalizedString> PSLName => "blacklist-modify";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] blacklist modification";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder
		.AddOption(
			"id",
			ApplicationCommandOptionType.Integer,
			"id of the condition",
			isRequired: true)
		.AddOption(
			"operation",
			ApplicationCommandOptionType.Integer,
			"what operation, please avoid Delete if possible",
			isRequired: true,
			choices: BuilderUtility.CreateChoicesFromEnum<Operation>());

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		int id = arg.GetIntegerOptionAsInt32("id");
		Operation operation = (Operation)arg.GetIntegerOptionAsInt32("operation");

		if (this._blackListService.Data.Data.TryGetValue(id, out BlackListCondition? condition))
		{
			switch (operation)
			{
				case Operation.Delete:
					this._blackListService.RemoveBlackList(id);
					await arg.QuickReply($"Condition with id {id} removed");
					break;
				case Operation.Disable:
					this._blackListService.DisableBlackList(id);
					await arg.QuickReply($"Condition with id {id} disabled");
					break;
				case Operation.Enable:
					this._blackListService.EnableBlackList(id);
					await arg.QuickReply($"Condition with id {id} enabled");
					break;
			}

			return;
		}

		await arg.QuickReply($"Condition with id {id} not found");
	}
}

