using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using PSLDiscordBot.Framework;

namespace FunPlugin;

public class FunPlugin : IPlugin<FunPlugin>
{
	public static string Name => "Fun commands";
	public static string Description => "Fun commands like /poke";
	public static string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public static int Priority => 114514_0;

	public static Task Load(WebApplicationBuilder hostBuilder)
	{
		hostBuilder.Services.Configure<FPConfig>(hostBuilder.Configuration.GetSection("FPConfig"));
		return Task.CompletedTask;
	}
	public static Task<FunPlugin> Setup(WebApplication host)
	{
		return Task.FromResult(new FunPlugin());
	}
	public Task Unload(WebApplication host, bool isSafeUnload)
	{
		return Task.CompletedTask;
	}
}
