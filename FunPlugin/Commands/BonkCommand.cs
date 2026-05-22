using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;

namespace FunPlugin.Commands;

[AddToGlobal]
public class BonkCommand : PokeCommand
{
	public BonkCommand(IServiceProvider provider, IOptions<FPConfig> fpConfig) : base(provider, fpConfig)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "bonk";
	public override OneOf<string, LocalizedString> PSLDescription => "Bonk me";
}
