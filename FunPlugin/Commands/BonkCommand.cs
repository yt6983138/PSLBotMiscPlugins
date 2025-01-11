using PSLDiscordBot.Framework.CommandBase;

namespace FunPlugin.Commands;

[AddToGlobal]
public class BonkCommand : PokeCommand
{
	public override string Name => "bonk";
	public override string Description => "Bonk me";
}
