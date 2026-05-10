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
public class BlackListAddCommand : AdminCommandBase
{
	private readonly BlackListService _blackListService;

	public BlackListAddCommand(IServiceProvider provider, BlackListService blackListService)
		: base(provider)
	{
		this._blackListService = blackListService;
	}

	public override OneOf<string, LocalizedString> PSLName => "blacklist-add";
	public override OneOf<string, LocalizedString> PSLDescription => "blacklist someone";

	public override SlashCommandBuilder CompleteBuilder
		=> this.BasicBuilder
		.AddOption(
			"expr",
			ApplicationCommandOptionType.String,
			"Expression to block, available vars: User, Channel, Guild, Command, Condition",
			isRequired: true)
		.AddOption(
			"description",
			ApplicationCommandOptionType.String,
			"comment for this block",
			isRequired: true)
		.AddOption(
			"chance",
			ApplicationCommandOptionType.Number,
			"chance to block command, 0 ~ 1",
			isRequired: true,
			minValue: 0,
			maxValue: 1)
		.AddOption(
			"duration",
			ApplicationCommandOptionType.String,
			"duration for this block, default: 30 days",
			isRequired: false)
		.AddOption(
			"reply",
			ApplicationCommandOptionType.String,
			"reply to user with what, default: AdminConfig.BlackListedDefaultMessage",
			isRequired: false);

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		string expr = arg.GetOption<string>("expr");
		string description = arg.GetOption<string>("description");
		float chance = (float)arg.GetOption<double>("chance");
		string? reply = arg.GetOptionOrDefault<string>("reply");
		string? durationStr = arg.GetOptionOrDefault<string>("duration");

		BlackListCondition condition = new(description, chance, expr, TimeSpan.TryParse(durationStr, out TimeSpan duration) ? duration : TimeSpan.FromDays(30))
		{
			BlockedResponse = reply
		};

		bool test;
		OneOf<LocalizedString, string>? message;
		try
		{
			test = this._blackListService.ShouldBlackList(condition, arg, arg.User, arg.Channel, (arg.Channel as SocketGuildChannel)?.Guild, out message);
		}
		catch (Exception ex)
		{
			await arg.QuickReply($"Error while testing: {ex.Message}");
			this._logger.LogError(ex, "Error while testing blacklist condition");
			return;
		}

		this._blackListService.AddBlackList(condition);
		OneOf<LocalizedString, string> value = message.HasValue ? message.Value : "<null>";
		string str = value.IsValue2 ? value.Value2 : value.Value1.Default;
		await arg.QuickReply($"BlackList added. Test result: {test}. Response message: {str}");
	}
}

