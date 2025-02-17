using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;

namespace FunPlugin.Commands;

[AddToGlobal]
public class BonkCommand : PokeCommand
{
	public override OneOf<string, LocalizedString> PSLName => "bonk";
	public override OneOf<string, LocalizedString> PSLDescription => "Bonk me";
}
