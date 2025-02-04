using PSLDiscordBot.Framework.Localization;

namespace AdminHelper;
public class AdminConfig
{
	public LocalizedString BlackListedUserMessage { get; set; } = LocalizedString.CreateDefault("Oops, something is wrong!");
}
