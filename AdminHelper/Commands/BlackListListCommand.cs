using AdminHelper.Models;
using AdminHelper.Services;
using Discord;
using Discord.WebSocket;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Models;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;

namespace AdminHelper.Commands;

[AddToGlobal]
public class BlackListListCommand : AdminCommandBase
{
	private readonly BlackListService _blackListService;

	public BlackListListCommand(IOptions<Config> config, DataBaseService database, LocalizationService localization, PhigrosService phigrosData, ILoggerFactory loggerFactory, BlackListService blackListService)
		: base(config, database, localization, phigrosData, loggerFactory)
	{
		this._blackListService = blackListService;
	}

	public override OneOf<string, LocalizedString> PSLName => "blacklist-list";
	public override OneOf<string, LocalizedString> PSLDescription => "blacklist list all conditions";

	public override SlashCommandBuilder CompleteBuilder
		=> this.BasicBuilder;

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		ColumnTextBuilder builder = new(
			"Id",
			"Disabled",
			"Added at",
			"Expires at",
			"Description",
			"Block chance",
			"Condition",
			"Reply");
		foreach (KeyValuePair<int, BlackListCondition> item in this._blackListService.Data.Data)
		{
			builder.WithRow(
				item.Key.ToString(),
				item.Value.Disabled.ToString(),
				item.Value.BlackListDate.ToString(),
				item.Value.ExpireDate.ToString(),
				item.Value.Description,
				item.Value.BlockChance.ToString(".000"),
				item.Value.BlockExpression,
				item.Value.BlockedResponse ?? "<default>");
		}

		await arg.QuickReplyWithAttachments("Blacklist conditions:", [PSLUtils.ToAttachment(builder.Build().ToString(), "Blacklist.txt")]);
	}
}

