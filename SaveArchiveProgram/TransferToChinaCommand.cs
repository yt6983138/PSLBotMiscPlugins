using Discord;
using Discord.WebSocket;
using MemoryPack;
using PhigrosLibraryCSharp.CloudSave;
using PhigrosLibraryCSharp.CloudSave.HttpModels;
using PhigrosLibraryCSharp.CloudSave.Login;
using PhigrosLibraryCSharp.Modification;
using PSLDiscordBot.Core.Command.Global;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Localization;
using PSLDiscordBot.Core.Models;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;
using PSLDiscordBot.Framework.Utilities;
using System.Text.Json;

namespace SaveArchiveProgram;

[AddToGlobal]
public partial class TransferToChinaCommand : CommandBase
{
	private enum ButtonOperation : byte
	{
		QRCodeLogin = 1,
		ConfirmedAccount = 2
	}

	[MemoryPackable]
	private partial class Context
	{
		/// <summary>
		/// should only be set by create component id
		/// </summary>
		public ButtonOperation NextOperation { get; set; }
		public bool UseArchivedData { get; set; }
		public string? AccountToken { get; set; }
		public bool ConfirmedOverride { get; set; }
	}

	public TransferToChinaCommand(IServiceProvider provider) : base(provider)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "transfer-to-china";
	public override OneOf<string, LocalizedString> PSLDescription => "Transfer your international save to China account.";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder
		.AddOption(
			"use_archived_data",
			ApplicationCommandOptionType.Boolean,
			"If true, the command will use the archived data instead of the live current save data.",
			isRequired: true)
		.AddOption(
			"account_token",
			ApplicationCommandOptionType.String,
			"China account token if you already have one and wants to skip QR Code login.",
			isRequired: false);

	private string CreateComponentId(ButtonOperation op, Context context)
	{
		context.NextOperation = op;
		return this.CreateComponentId(MemoryPackSerializer.Serialize(context));
	}
	private static ButtonOperation ParseComponentId(byte[] payload, out Context context)
	{
		context = MemoryPackSerializer.Deserialize<Context>(payload).EnsureNotNull();
		return context.NextOperation;
	}

	public override async Task Callback(SocketSlashCommand arg, UserData data, DataBaseService.DbDataRequester requester, object executer)
	{
		bool useArchive = arg.GetOption<bool>("use_archived_data");
		string? optionalToken = arg.GetOptionOrDefault<string>("account_token");

		bool userArchiveDirExists = Directory.Exists($"{SaveArchiveService.ArchiveProgramDir}/{data.UserId}");

		// we have added a check inside the archive command, so only international accounts will have archived data
		if (!data.IsInternational && !userArchiveDirExists)
		{
			await arg.QuickReply("Sorry, non-international accounts cannot use this command. This is for 2026/10/31 international save discontinuation.");
			return;
		}
		if (!data.HasCloudBinding && !useArchive)
		{
			await arg.QuickReply("Sorry, this command is only available while your account has cloud save binding. If you have archived before, please specify the `use_archived_data` option.");
			return;
		}

		// quick defense to not waste the user's time
		if (useArchive && !userArchiveDirExists)
		{
			await arg.QuickReply("Sorry, you specified to use archived data, but no archived data found for you. Please ensure you have ever ran `/archive-save` or use live save data.");
			return;
		}

		Context context = new()
		{
			UseArchivedData = useArchive,
			AccountToken = optionalToken
		};

		if (optionalToken is null)
		{
			await arg.QuickReply("You will be prompted to login to your China account. If you wish to use an existing token, please rerun this command and provide it in the `account_token` option.",
				x => x.Components = new ComponentBuilderV2()
					.WithActionRow([new ButtonBuilder()
						.WithCustomId(this.CreateComponentId(ButtonOperation.QRCodeLogin, context))
						.WithLabel("Begin QR Code Login")
						.WithStyle(ButtonStyle.Primary)])
					.Build());
			return;
		}

		await this.LoginDone(new(optionalToken, false), arg, context);
	}

	public override async Task HandleInteraction(SocketInteraction arg, object executer)
	{
		if (arg is not SocketMessageComponent component) return;
		await arg.QuickReply("Please wait...", x => x.Components = null);

		ButtonOperation componentId = ParseComponentId(component.GetComponentPayload(), out Context context);

		if (componentId == ButtonOperation.QRCodeLogin)
		{
			CompleteQRCodeData qrCode = await TapTapHelper.RequestLoginQrCode(useChinaEndpoint: true);
			DateTime stopAt = DateTime.Now + new TimeSpan(0, 0, qrCode.ExpiresInSeconds - 15);
			await arg.QuickReply(x => x.Components = null, this._localization[PSLGuestCommandKey.LoginBegin], new LoginCommand.QRCodeDataModel(qrCode, false));

			await this.QRCodeLogin(qrCode, stopAt, arg, context);
		}
		else if (componentId == ButtonOperation.ConfirmedAccount)
		{
			await this.Upload(context, arg);
		}
	}

	private async Task QRCodeLogin(CompleteQRCodeData qrCode, DateTime stopAt, IDiscordInteraction arg, Context context)
	{
		string? token = await LoginCommand.ListenQrCodeChange(qrCode, true, stopAt);
		if (token is null)
		{
			await arg.QuickReply(this._localization[PSLGuestCommandKey.LoginTimedOut]);
			return;
		}

		UploadableSave save = new(token, false);

		await this.LoginDone(save, arg, context);
	}
	private async Task LoginDone(Save save, IDiscordInteraction arg, Context context)
	{
		PlayerInfo playerInfo = await save.GetPlayerInfoAsync();
		context.AccountToken = save.SessionToken;

		await arg.QuickReply($"""
			Login successful! Is this your destination account?
			Name: {playerInfo.NickName}
			Created at: {playerInfo.CreationTime:G}

			If no, please rerun this command and try another account to login.
			If yes, please read the following instructions carefully and click "Proceed" to continue:
			1. Make sure you have a backup of your China account data, as this process may overwrite your current save data.
			2. After doing so and clicking "Proceed", your latest international save data will be transferred to your China account. This process is **irreversible**.
			""", x => x.Components = new ComponentBuilderV2()
				.WithActionRow([new ButtonBuilder()
					.WithCustomId(this.CreateComponentId(ButtonOperation.ConfirmedAccount, context))
					.WithLabel("Proceed (NO WAY TO GO BACK)")
					.WithStyle(ButtonStyle.Danger)])
				.Build());
	}
	private async Task Upload(Context context, IDiscordInteraction arg)
	{
		await arg.QuickReply("Transferring...", x => x.Components = null);

		UploadableSave destination = new(context.AccountToken.EnsureNotNull(), false);
		SaveInfoContainer destSaveInfo = await destination.GetSaveInfoFromCloudAsync();

		if (destSaveInfo.Results.Count != 0 && !context.ConfirmedOverride)
		{
			context.ConfirmedOverride = true;
			await arg.QuickReply($"""
				Warning: Your destination account already has save data. Continue to transfer will **overwrite** it.

				If you wish to proceed, please click the "Proceed" button below. If you do not wish to overwrite your existing save data, please cancel this operation.
				""", x => x.Components = new ComponentBuilderV2()
					.WithActionRow([new ButtonBuilder()
						.WithCustomId(this.CreateComponentId(ButtonOperation.ConfirmedAccount, context))
						.WithLabel("Proceed")
						.WithStyle(ButtonStyle.Danger)])
					.Build());
			return;
		}

		UserData userData;
		using (DataBaseService.DbDataRequester db = this._dataBaseService.NewRequester())
		{
			userData = await db.GetUserDataDirectlyAsync(arg.User.Id).EnsureNotNull();
		}

		byte[] saveData;
		string summary;
		if (context.UseArchivedData)
		{
			DirectoryInfo archivedDir = new($"{SaveArchiveService.ArchiveProgramDir}/{userData.UserId}");
			FileInfo latestArchiveInfo = archivedDir.GetFiles("ArchivedInfo_*.json")
				.Select(x => (x, long.Parse(x.Name[13..^5])))
				.MaxBy(x => x.Item2).x;

			ArchivedInfo archiveInfo = JsonSerializer.Deserialize<ArchivedInfo>(await File.ReadAllTextAsync(latestArchiveInfo.FullName))
				.EnsureNotNull();

			string saveInfoFile = archiveInfo.ArchivedFiles.First(x => x.StartsWith("SaveInfo"));
			SaveInfoContainer originSaveInfo = JsonSerializer.Deserialize<SaveInfoContainer>(await File.ReadAllTextAsync(Path.Combine(archivedDir.FullName, saveInfoFile)));
			SaveInfo first = originSaveInfo.Results.First();
			summary = first.Summary;
			string saveFileObjectId = first.GameFile.EnsureNotNull().ObjectId;

			string saveFile = archiveInfo.ArchivedFiles.First(x => x.StartsWith($"Save_{saveFileObjectId}"));
			saveData = await File.ReadAllBytesAsync(Path.Combine(archivedDir.FullName, saveFile));
		}
		else
		{
			SaveInfoContainer originSaveInfo = await userData.SaveCache.GetSaveInfoFromCloudAsync();
			SaveInfo first = originSaveInfo.Results.First();
			summary = first.Summary;
			saveData = await userData.SaveCache.GetSaveZipAsync(first.Simplify());
		}

		string userId = await destination.GetUserObjectId();
		byte[] summaryBase64 = Convert.FromBase64String(summary);

		if (destSaveInfo.Results.Count == 0)
		{
			// happy path: no existing save data, just upload
			await destination.UploadSave(userId, null, null, saveData, summaryBase64);
		}
		else
		{
			// here, we need to first download the old first data, reupload it (send to back), then override the first data with the new one
			SaveInfo oldFirst = destSaveInfo.Results.First();
			byte[] oldSaveData = await destination.GetSaveZipAsync(oldFirst.Simplify());

			// push to back
			await destination.UploadSave(userId, null, null, oldSaveData, Convert.FromBase64String(oldFirst.Summary));

			// override
			await destination.UploadSave(userId, null, oldFirst.ObjectId, saveData, summaryBase64);
		}

		await arg.QuickReply($"""
			Transfer complete! Please check your destination account. Have fun with your new cloud save!
			The destination account's token for future use is: ||{destination.SessionToken}||
			You can use this token to login into this bot again (`/link-token`).
			""", x => x.Components = null);
	}
}
