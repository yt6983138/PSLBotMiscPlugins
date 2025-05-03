using Discord;
using Discord.WebSocket;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Services.Phigros;
using PSLDiscordBot.Core.UserDatas;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;

namespace FunPlugin.Commands;

[AddToGlobal]
public class PokeCommand : GuestCommandBase
{
	private readonly IOptions<FPConfig> _fpConfig;

	public PokeCommand(IOptions<Config> config, DataBaseService database, LocalizationService localization, PhigrosDataService phigrosData, ILoggerFactory loggerFactory, IOptions<FPConfig> fpConfig)
		: base(config, database, localization, phigrosData, loggerFactory)
	{
		this._fpConfig = fpConfig;
	}

	public override OneOf<string, LocalizedString> PSLName => "poke";
	public override OneOf<string, LocalizedString> PSLDescription => "Poke me";
	public override bool IsEphemeral => false;

	public override SlashCommandBuilder CompleteBuilder
		=> this.BasicBuilder;

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		List<PokeRandomShowInfo> list = this._fpConfig.Value.PokeRandoms;
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
			this._logger.LogWarning(this.EventId, "Message is empty, replacing with zero width space. (Index: {index})", list.IndexOf(selected));
		}

		if (selected.AttachmentPath is not null)
		{
			if (!File.Exists(selected.AttachmentPath))
			{
				this._logger.LogWarning(this.EventId, "Attachment {path} does not exist.", selected.AttachmentPath);
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
