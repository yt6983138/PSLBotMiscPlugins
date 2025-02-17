using AdminHelper.Services;
using Discord;
using Discord.WebSocket;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.UserDatas;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;

namespace AdminHelper.Commands;

[AddToGlobal]
public class BlackListCommand : AdminCommandBase
{
	public override OneOf<string, LocalizedString> PSLName => "blacklist-add";
	public override OneOf<string, LocalizedString> PSLDescription => "black someone";

	public override SlashCommandBuilder CompleteBuilder
		=> this.BasicBuilder
		.AddOption(
			"who",
			ApplicationCommandOptionType.User,
			"Who to block",
			isRequired: true)
		.AddOption(
			"chance",
			ApplicationCommandOptionType.Number,
			"chance to block command, 0 ~ 1",
			isRequired: true,
			minValue: 0,
			maxValue: 1);

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		IUser who = arg.GetOption<IUser>("who");
		double chance = arg.GetOption<double>("chance");
		GetSingleton<BlackListService>().BlockUser(
			who.Id,
			_ => Random.Shared.NextDouble() < chance);
		await arg.QuickReply("done");
	}
}
