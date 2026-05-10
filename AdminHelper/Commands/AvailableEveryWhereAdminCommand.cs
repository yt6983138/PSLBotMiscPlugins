using Discord;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Services;

namespace AdminHelper.Commands;

public abstract class AvailableEveryWhereAdminCommand : AdminCommandBase
{
	protected AvailableEveryWhereAdminCommand(IServiceProvider provider) : base(provider)
	{
	}

	public override InteractionContextType[] InteractionContextTypes =>
	[
		InteractionContextType.Guild,
		InteractionContextType.BotDm,
		InteractionContextType.PrivateChannel
	];
}

