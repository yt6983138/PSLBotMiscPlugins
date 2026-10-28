using Discord;
using Discord.WebSocket;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Models;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;
using PSLDiscordBot.Framework.Utilities;

namespace SaveArchiveProgram;

[AddToGlobal]
public class ArchiveSaveCommand : CommandBase
{
	private readonly SaveArchiveService _saveArchiveService;

	public ArchiveSaveCommand(IServiceProvider provider, SaveArchiveService service) : base(provider)
	{
		this._saveArchiveService = service;
	}

	public override OneOf<string, LocalizedString> PSLName => "archive-save";
	public override OneOf<string, LocalizedString> PSLDescription => "Archives your current save to our server. This is for 2026/10/31 global save discontinuation.";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder;

	public override async Task Callback(SocketSlashCommand arg, UserData data, DataBaseService.DbDataRequester requester, object executer)
	{
		// a retained international binding is not enough while local mode is active; the editable local collection is never archived
		if (data.IsLocal)
		{
			await arg.QuickReply("Sorry, this command is only available while your account uses cloud saves.");
			return;
		}

		if (!data.IsInternational)
		{
			await arg.QuickReply("Sorry, this command is only available for international users.");
			return;
		}

		if (this._saveArchiveService.TryAgreeTerms(arg.User.Id))
		{
			await arg.QuickReply("""
				Hello, thank you for enrolling the archive!
				This program is for the 2026/10/31 global save discontinuation. We will keep your save data in our server for you to retrieve or transfer it after the discontinuation.

				Currently, the terms are not specified in the TOS, and this command will be removed after the discontinuation. Please make sure to read the terms before agreeing:

				1. You agree to the terms and conditions of the archive program.
				2. You understand that your save data will be stored on our server for the purpose of archiving or transferring to further feature implementation.
				3. You agree that we will not use your save data for any other purpose.
				4. You understand that this command will be removed after the discontinuation of the global save.
				5. There is currently no command to delete your archived save data. If you wish to delete your archived save data, please contact us via DM or tickets in support server.

				If you have reviewed the terms and conditions, please do this command again and you will be enrolled in the archive program. If you do not agree to the terms, please do not use this command again.
				""");
			return;
		}

		if (await this._saveArchiveService.EnqueueArchive(data))
		{
			await arg.QuickReply("You have been put into the archive queue. Thank you for using the archive program!");
			return;
		}

		await arg.QuickReply("You have already been queued for archiving. Please try this command later if you wish to archive again.");
	}
}
