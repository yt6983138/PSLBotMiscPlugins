using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using PSLDiscordBot.Framework;

namespace LocalizationTranslatorHelper;

public class LocalizationTranslatorHelperPlugin : IPlugin
{
	string IPlugin.Name => "PSLDiscordBot Core";
	string IPlugin.Description => "Core implementation for PSLDiscord bot";
	Version IPlugin.Version => new(1, 3, 0, 0);
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;
	int IPlugin.Priority => 1145141919;

	void IPlugin.Load(WebApplicationBuilder hostBuilder, bool isDynamicLoading)
	{
	}
	void IPlugin.Setup(IHost host)
	{
	}
	void IPlugin.Unload(IHost host, bool isDynamicUnloading)
	{
	}
}
