using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PSLDiscordBot.Framework;

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

	public void Load(WebApplicationBuilder hostBuilder, bool isDynamicLoading)
	{
		hostBuilder.Services.Configure<FPConfig>(hostBuilder.Configuration.GetSection("FPConfig"));
	}
	public void Setup(IHost host)
	{
	}
	public void Unload(IHost host, bool isDynamicUnloading)
	{
	}
}
