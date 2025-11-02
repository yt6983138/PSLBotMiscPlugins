using AdminHelper.Services;
using Discord;
using Discord.WebSocket;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Services.Phigros;
using PSLDiscordBot.Core.UserDatas;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;

namespace AdminHelper.Commands;

[AddToGlobal]
public class BlackListCommandCommand : AdminCommandBase
{
	private readonly BlackListService _blackListService;

	public BlackListCommandCommand(IOptions<Config> config, DataBaseService database, LocalizationService localization, PhigrosService phigrosData, ILoggerFactory loggerFactory, BlackListService blackListService)
		: base(config, database, localization, phigrosData, loggerFactory)
	{
		this._blackListService = blackListService;
	}

	public override OneOf<string, LocalizedString> PSLName => "blacklist-command-add";
	public override OneOf<string, LocalizedString> PSLDescription => "blacklist command";

	public override SlashCommandBuilder CompleteBuilder
		=> this.BasicBuilder
		.AddOption(
			"command",
			ApplicationCommandOptionType.String,
			"What command to block",
			isRequired: true);
	//.AddOption( // not implemented yet
	//	"path_matchers",
	//	ApplicationCommandOptionType.String,
	//	"Path matchers for the command to block, separated by ;",
	//	isRequired: true);

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		string command = arg.GetOption<string>("command");
		this._blackListService.BlockCommand(command);
		await arg.QuickReply("done");
	}
}
