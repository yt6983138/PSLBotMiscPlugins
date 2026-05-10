using AdminHelper.Services;
using Discord;
using Discord.WebSocket;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Models;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;

namespace AdminHelper.Commands;

[AddToGlobal]
public class ToggleMaintenanceCommand : AdminCommandBase
{
	private readonly StatusService _statusService;

	public ToggleMaintenanceCommand(IServiceProvider provider, StatusService statusService)
		: base(provider)
	{
		this._statusService = statusService;
	}

	public override bool IsEphemeral => false;
	public override InteractionContextType[] InteractionContextTypes =>
	[
		InteractionContextType.Guild,
		InteractionContextType.BotDm,
		InteractionContextType.PrivateChannel
	];

	public override OneOf<string, LocalizedString> PSLName => "toggle-maintenance";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] Toggle maintenance.";

	public override SlashCommandBuilder CompleteBuilder =>
		this.BasicBuilder;

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		this._statusService.CurrentStatus =
			this._statusService.CurrentStatus == Status.UnderMaintenance
				? Status.Normal
				: Status.UnderMaintenance;

		await arg.ModifyOriginalResponseAsync(
			x => x.Content = $"Operation done successfully, current status: {this._statusService.CurrentStatus}");
	}
}

