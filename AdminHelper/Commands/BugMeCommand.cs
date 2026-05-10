using Discord;
using Discord.WebSocket;
using Microsoft.Extensions.Logging;
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
public class BugMeCommand : AdminCommandBase
{
	public BugMeCommand(IServiceProvider provider)
		: base(provider)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "bug-me";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] Can be used to test exception handling.";

	public override SlashCommandBuilder CompleteBuilder =>
		this.BasicBuilder
		.AddOption(
			"reply",
			ApplicationCommandOptionType.Boolean,
			"Should reply before throw",
			isRequired: true);

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		if (arg.GetOption<bool>("reply"))
			await arg.QuickReply("Thrown exception.");

		throw new NotImplementedException("Testing");
	}
}

