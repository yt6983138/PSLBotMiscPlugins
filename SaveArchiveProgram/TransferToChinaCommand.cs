using Discord;
using Discord.WebSocket;
using MemoryPack;
using PhigrosLibraryCSharp.CloudSave;
using PhigrosLibraryCSharp.CloudSave.HttpModels;
using PhigrosLibraryCSharp.CloudSave.Login;
using PhigrosLibraryCSharp.Modification;
using PSLDiscordBot.Core.Command.Constraints;
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
		public string? AccountToken { get; set; }
		public bool ConfirmedOverride { get; set; }
	}

	public TransferToChinaCommand(IServiceProvider provider) : base(provider)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "transfer-to-china";
	public override OneOf<string, LocalizedString> PSLDescription => "Transfer your international save to China account.";

	public override IReadOnlyList<IConstraint> MasterConstraints => [this._registeredConstraint, this._tosConstraint];

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder
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

	public override async Task RootCallback(SocketSlashCommand arg, UserData? data)
	{
		string? optionalToken = arg.GetOptionOrDefault<string>("account_token");

		// quick defense to not waste the user's time
		if (!Directory.Exists($"{SaveArchiveService.ArchiveProgramDir}/{data!.UserId}"))
		{
			await arg.QuickReply("Sorry, there is no archived save to transfer for you.");
			return;
		}

		Context context = new()
		{
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

	public override async Task HandleInteraction(SocketInteraction arg)
	{
		if (arg is not SocketMessageComponent component) return;
		await arg.QuickReply("Please wait...", x => x.Components = null);

		ButtonOperation componentId = ParseComponentId(component.GetComponentPayload(), out Context context);

		if (componentId == ButtonOperation.QRCodeLogin)
		{
			CompleteQRCodeData qrCode = await TapTapHelper.RequestLoginQrCode(useChinaEndpoint: true);
			DateTime stopAt = DateTime.Now + new TimeSpan(0, 0, qrCode.ExpiresInSeconds - 15);
			await arg.QuickReply(x => x.Components = null, this._localization[PSLAccountCommandKey.AccountRegisterQrCodeBegin], new AccountCommand.QRCodeDataModel(qrCode, false));

			await this.QRCodeLogin(qrCode, stopAt, arg, context);
		}
		else if (componentId == ButtonOperation.ConfirmedAccount)
		{
			await this.Upload(context, arg);
		}
	}

	private async Task QRCodeLogin(CompleteQRCodeData qrCode, DateTime stopAt, IDiscordInteraction arg, Context context)
	{
		string? token = await AccountCommand.ListenQrCodeChange(qrCode, true, stopAt);
		if (token is null)
		{
			await arg.QuickReply(this._localization[PSLAccountCommandKey.AccountRegisterQrCodeTimedOut]);
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

			**Warning:**
			- This writes your save data into the China-server (TapTap China) cloud save of the destination account, and may overwrite existing data there.
			- This uses an unofficial third-party tool that is **not authorized or endorsed** by Pigeon Games or TapTap, and may violate their applicable terms (e.g. TapTap China's terms). TapTap or Pigeon Games may restrict or take action against the accounts involved.
			- This is done only at your request, and you are **solely responsible** for any consequences. Keep your own backup.
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

		DirectoryInfo archivedDir = new($"{SaveArchiveService.ArchiveProgramDir}/{userData.UserId}");
		FileInfo latestArchiveInfo = archivedDir.GetFiles("ArchivedInfo_*.json")
			.Select(x => (x, long.Parse(x.Name[13..^5])))
			.MaxBy(x => x.Item2).x;

		ArchivedInfo archiveInfo = JsonSerializer.Deserialize<ArchivedInfo>(await File.ReadAllTextAsync(latestArchiveInfo.FullName))
			.EnsureNotNull();

		string saveInfoFile = archiveInfo.ArchivedFiles.First(x => x.StartsWith("SaveInfo"));
		SaveInfoContainer originSaveInfo = JsonSerializer.Deserialize<SaveInfoContainer>(await File.ReadAllTextAsync(Path.Combine(archivedDir.FullName, saveInfoFile)));
		SaveInfo first = originSaveInfo.Results.First();
		string summary = first.Summary;
		string saveFileObjectId = first.GameFile.EnsureNotNull().ObjectId;

		string saveFile = archiveInfo.ArchivedFiles.First(x => x.StartsWith($"Save_{saveFileObjectId}"));
		byte[] saveData = await File.ReadAllBytesAsync(Path.Combine(archivedDir.FullName, saveFile));

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
			You can use this token to login into this bot again (`/account register token`).
			""", x => x.Components = null);
	}
}
