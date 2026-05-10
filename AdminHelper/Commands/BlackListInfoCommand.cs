using AdminHelper.Models;
using AdminHelper.Services;
using Discord;
using Discord.WebSocket;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
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
public class BlackListInfoCommand : AdminCommandBase
{
	private readonly BlackListService _blackListService;

	public BlackListInfoCommand(IServiceProvider provider, BlackListService blackListService)
		: base(provider)
	{
		this._blackListService = blackListService;
	}

	public override OneOf<string, LocalizedString> PSLName => "blacklist-info";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] blacklist info";

	public override SlashCommandBuilder CompleteBuilder
		=> this.BasicBuilder
		.AddOption(
			"id",
			ApplicationCommandOptionType.Integer,
			"id of the condition",
			isRequired: true);

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		int id = arg.GetIntegerOptionAsInt32("id");

		if (this._blackListService.Data.Data.TryGetValue(id, out BlackListCondition? condition))
		{
			await arg.QuickReply(JsonConvert.SerializeObject(condition, Formatting.Indented));
			return;
		}

		await arg.QuickReply($"Condition with id {id} not found");
	}
}

