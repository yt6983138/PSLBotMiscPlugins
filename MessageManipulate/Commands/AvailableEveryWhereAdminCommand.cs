using Discord;
using PSLDiscordBot.Core.Command.Global.Base;

namespace MessageManipulate.Commands;

public abstract class AvailableEveryWhereAdminCommand : AdminCommandBase
{
	public override InteractionContextType[] InteractionContextTypes =>
	[
		InteractionContextType.Guild,
		InteractionContextType.BotDm,
		InteractionContextType.PrivateChannel
	];
}
