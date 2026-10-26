using Discord;
using Discord.WebSocket;
using Microsoft.Extensions.DependencyInjection;
using PSLDiscordBot.Core.Command.Global;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Models;
using PSLDiscordBot.Core.Models.LocalImport;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;
using PSLDiscordBot.Framework.Utilities;
using System.Diagnostics;

namespace SaveArchiveProgram;

/// <summary>
/// Imports the user's newest archived save into the local score system: check that an archive exists, ask for
/// confirmation, then hand the parsed archive to Core's shared import workflow.
/// </summary>
[AddToGlobal]
public class LocalImportArchiveCommand : CommandBase
{
	// payload: {action:1}{mode:1}
	private const byte ProceedAction = 1;

	private readonly LocalCommand _localCommand;

	public LocalImportArchiveCommand(IServiceProvider provider) : base(provider)
	{
		// Core's local command is a keyed singleton; its public entry runs the shared prepare/confirm workflow
		this._localCommand = (LocalCommand)provider.GetRequiredKeyedService<BasicCommandBase>(typeof(LocalCommand));
	}

	public override OneOf<string, LocalizedString> PSLName => "local-import-archive";
	public override OneOf<string, LocalizedString> PSLDescription => "Imports your latest archived save into your local collection.";

	public override bool RequireTOSAcceptance => true;

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder
		.AddOption(
			"mode",
			ApplicationCommandOptionType.Integer,
			"How to merge the archived save into your local collection.",
			isRequired: true,
			choices: BuilderUtility.CreateChoicesFromEnum<LocalImportMode>());

	public override async Task Callback(SocketSlashCommand arg, UserData data, DataBaseService.DbDataRequester requester, object executer)
	{
		if (!await LocalSaveArchiveProvider.HasArchiveAsync(data.UserId))
		{
			await arg.QuickReply("No archived save was found for your account.");
			return;
		}

		LocalImportMode mode = (LocalImportMode)arg.GetOption<long>("mode");
		await arg.QuickReply(
			$"""
			Your latest archived save was found. Import it into your local collection (mode: {mode})?
			You will get a preview of the changes before anything is overwritten, if it conflicts with your current data.
			""",
			x => x.Components = new ComponentBuilderV2()
				.WithActionRow([new ButtonBuilder()
					.WithCustomId(this.CreateComponentId(ProceedAction, mode))
					.WithLabel("Proceed")
					.WithStyle(ButtonStyle.Success)])
				.Build());
	}

	public override async Task HandleInteraction(SocketInteraction arg, object executer)
	{
		if (arg is not SocketMessageComponent component) return;

		byte[] payload = component.GetComponentPayload();
		if (payload.Length != 2) throw new UnreachableException($"Incorrect payload length {payload.Length}");
		if (payload[0] != ProceedAction || !Enum.IsDefined((LocalImportMode)payload[1])) throw new UnreachableException("Invalid payload");

		await component.QuickReply("Importing...", x => x.Components = null);

		UserData? userData;
		using (DataBaseService.DbDataRequester db = this._dataBaseService.NewRequester())
		{
			userData = await db.GetUserDataDirectlyAsync(component.User.Id);
		}
		userData = await this._localCommand.GetRegisteredUserOrReplyAsync(component, userData);
		if (userData is null) return;

		ParsedLocalImport? parsed = await LocalSaveArchiveProvider.ReadLatestAsync(userData.UserId);
		if (parsed is null)
		{
			await component.QuickReply("Your archived save could not be read. Nothing was imported.");
			return;
		}

		await this._localCommand.HandleLocalImportAsync(component, userData, parsed, (LocalImportMode)payload[1]);
	}

	private string CreateComponentId(byte action, LocalImportMode mode)
	{
		return this.CreateComponentId([action, (byte)mode]);
	}
}
