using FunPlugin.Services;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.DependencyInjection;

namespace FunPlugin;

public class FunPlugin : IPlugin
{
	string IPlugin.Name => "Fun commands";
	string IPlugin.Description => "Fun commands like /poke";
	Version IPlugin.Version => new(1, 0, 0, 0);
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => 114514_0;

	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;

	void IPlugin.Load(Program program, bool isDynamicLoading)
	{
		InjectableBase.AddSingleton(new FPConfigService());
	}

	void IPlugin.Unload(Program program, bool isDynamicUnloading)
	{
	}
}
