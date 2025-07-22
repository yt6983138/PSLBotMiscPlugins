using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Services.Phigros;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;

namespace FunPlugin.Commands;

[AddToGlobal]
public class BonkCommand : PokeCommand
{
	public BonkCommand(IOptions<Config> config, DataBaseService database, LocalizationService localization, PhigrosService phigrosData, ILoggerFactory loggerFactory, IOptions<FPConfig> fpConfig) : base(config, database, localization, phigrosData, loggerFactory, fpConfig)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "bonk";
	public override OneOf<string, LocalizedString> PSLDescription => "Bonk me";
}
