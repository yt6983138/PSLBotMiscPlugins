using Discord;
using Discord.WebSocket;
using FunPlugin.Services;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.UserDatas;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.DependencyInjection;

namespace FunPlugin.Commands;

[AddToGlobal]
public class PokeCommand : GuestCommandBase
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
	[Inject]
	public FPConfigService FPConfigService { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

	public override string Name => "poke";
	public override string Description => "Poke me";
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

		if (selected.AttachmentPath is not null && File.Exists(selected.AttachmentPath))
		{
			await arg.QuickReplyWithAttachments(
				selected.Message,
				new FileAttachment(
					new FileStream(selected.AttachmentPath, FileMode.Open),
					Path.GetFileName(selected.AttachmentPath)));
			return;
		}
		await arg.QuickReply(selected.Message);
	}
}
