using Discord;
using Discord.WebSocket;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.UserDatas;
using PSLDiscordBot.Framework.CommandBase;

namespace FunPlugin.Commands;

[AddToGlobal]
public class PokeCommand : GuestCommandBase
{
	public List<string> Replies { get; set; } = new()
	{
		"Huh? (●´π`●)",
		"Sup?",
		@"*sleeping\*",
		@"\_(´ཀ`」 ∠) _",
		"ehh, huh, huh, eraaaaaaaaaaaaaammmmm, aaaaaaaaaaaaaaaaah, aaaaaaaaaaaaaaaaaaa... x114514",
		"Yum",
		"oiiaiooiiai",
		@"你幹嘛~哈哈哎呦\~",
		"Huh? (A cat looking back at you with confused face)",
		@"Never gonna give you up",
		@"https://media1.tenor.com/m/kGekz062mwgAAAAd/hugs-rickroll.gif",
		@"https://cdn.discordapp.com/emojis/1256866192392716350.webp?size=128&quality=lossless", // geo_drool_114
		@"https://cdn.discordapp.com/emojis/1239514731656646757.webp?size=128&quality=lossless", // geo_hug
		@"https://cdn.discordapp.com/emojis/1187211420606152795.webp?size=128&quality=lossless", // geo_drool
		"https://media.discordapp.net/attachments/921676986739458102/1149709952395513896/IMG_4487.png" +
		"?ex=66aaf015&is=66a99e95&hm=f3e66bd01c39c5d26cd098e1efa1482055d33d87477e992f80359facb7164a25&=&" +
		"format=webp&quality=lossless&width=687&height=253", // camilla
		"https://media.discordapp.net/attachments/921676986739458102/1144178787349692426/-nhgp97.png" +
		"?ex=66aa9748&is=66a945c8&hm=1dee2254fc591a10967ed3d6be52d8ed118bd51885499044b62547b5e0cd903e&=&" +
		"format=webp&quality=lossless&width=436&height=437", // mopemope
	};

	public override string Name => "poke";
	public override string Description => "Poke me";
	public override bool IsEphemeral => false;

	public override SlashCommandBuilder CompleteBuilder
		=> this.BasicBuilder;

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		string str = this.Replies[Random.Shared.Next(0, this.Replies.Count)];

		await arg.ModifyOriginalResponseAsync(
			x => x.Content = str);
	}
}
