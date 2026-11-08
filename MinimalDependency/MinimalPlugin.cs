using Discord;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;

namespace MinimalDependency;
public class MinimalPlugin : IPlugin<MinimalPlugin>
{
	public bool Initialized { get; private set; }

	public static string Name => "PSLDiscordBot Minimal";
	public static string Description => "Minimal implementation for PSLDiscord bot";
	public static string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public static int Priority => -1;

	public static Task Load(WebApplicationBuilder hostBuilder)
	{
		hostBuilder.Services.Configure<Config>(
			hostBuilder.Configuration.GetSection("MinimalPlugin"));
		hostBuilder.Services.Configure<DiscordClientServiceConfig>(config =>
		{
			config.Token = hostBuilder.Configuration.GetRequiredSection("MinimalPlugin")[nameof(Config.Token)] ?? "";
		});
		return Task.CompletedTask;
	}
	public static Task<MinimalPlugin> Setup(WebApplication host)
	{
		MinimalPlugin plugin = new();
		IDiscordClientService discordClientService = host.Services.GetRequiredService<IDiscordClientService>();
		discordClientService.SocketClient.Log += plugin.Log;
		discordClientService.SocketClient.Ready += plugin.Client_Ready;
		return Task.FromResult(plugin);
	}
	public Task Unload(WebApplication host, bool isSafeUnload)
	{
		return Task.CompletedTask;
	}

	private Task Client_Ready()
	{
		this.Initialized = true;
		return Task.CompletedTask;
	}
	private Task Log(LogMessage msg)
	{
		Console.WriteLine($"{msg.Severity}: {msg.Message}");
		if (msg.Exception is not null)
			Console.WriteLine(msg.Exception.ToString());

		return Task.CompletedTask;
	}
}
