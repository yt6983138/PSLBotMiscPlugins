using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;

namespace FunPlugin;

public class FunPlugin : IPlugin
{
	string IPlugin.Name => "Fun commands";
	string IPlugin.Description => "Fun commands like /poke";
	Version IPlugin.Version => new(1, 0, 0, 0);
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => 114514_0;

	public void Load(WebApplicationBuilder hostBuilder)
	{
		hostBuilder.Services.Configure<FPConfig>(hostBuilder.Configuration.GetSection("FPConfig"));
	}
	public void ConfigureDiscordClient(WebApplicationBuilder builder, DiscordClientServiceConfig config) { }
	public void Setup(WebApplication host)
	{
	}
	public void Unload(WebApplication host, bool isSafeUnload)
	{
	}
}
