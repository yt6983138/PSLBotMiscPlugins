using Discord;
using Discord.WebSocket;
using FunPlugin.Services;
using Microsoft.Extensions.Logging;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.UserDatas;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.DependencyInjection;
using PSLDiscordBot.Framework.Localization;

namespace FunPlugin.Commands;

[AddToGlobal]
public class PokeCommand : GuestCommandBase
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
	[Inject]
	public FPConfigService FPConfigService { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

	public override OneOf<string, LocalizedString> PSLName => "poke";
	public override OneOf<string, LocalizedString> PSLDescription => "Poke me";
	public override bool IsEphemeral => false;

	public override SlashCommandBuilder CompleteBuilder
		=> this.BasicBuilder;

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		List<PokeRandomShowInfo> list = this.FPConfigService.Data.PokeRandoms;
		float allWeights = list.Sum(x => x.Weight);
		float random = Random.Shared.NextSingle() * allWeights;

		PokeRandomShowInfo selected = list[0];
		foreach (PokeRandomShowInfo item in list)
		{
			random -= item.Weight;
			if (random < 0)
			{
				selected = item;
				break;
			}
		}

		string message = selected.Message;
		if (string.IsNullOrEmpty(message))
		{
			// discord.net please update ur shitty empty string detection
			message = "\u200b"; // zero width space
			this.Logger.Log(LogLevel.Warning, $"Message is empty, replacing with zero width space. (Index: {list.IndexOf(selected)})");
		}

		if (selected.AttachmentPath is not null)
		{
			if (!File.Exists(selected.AttachmentPath))
			{
				this.Logger.Log(LogLevel.Warning, $"Attachment {selected.AttachmentPath} does not exist.", this.EventId, this);
				goto NoAttachment;
			}

			await arg.QuickReplyWithAttachments(
				message,
				new FileAttachment(
					new FileStream(selected.AttachmentPath, FileMode.Open),
					Path.GetFileName(selected.AttachmentPath)));
			return;
		}
	NoAttachment:
		await arg.QuickReply(message);
	}
}
