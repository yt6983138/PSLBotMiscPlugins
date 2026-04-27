using Discord;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;

namespace MinimalDependency;
public class MinimalPlugin : IPlugin
{
	public bool Initialized { get; private set; }

	string IPlugin.Name => "PSLDiscordBot Minimal";
	string IPlugin.Description => "Minimal implementation for PSLDiscord bot";
	Version IPlugin.Version => new(1, 0, 0, 0);
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => -1;

	public void Load(WebApplicationBuilder hostBuilder)
	{
		hostBuilder.Services.Configure<Config>(
			hostBuilder.Configuration.GetSection("MinimalPlugin"));
	}
	public void ConfigureDiscordClient(WebApplicationBuilder builder, DiscordClientServiceConfig config)
	{
		config.Token = builder.Configuration.GetRequiredSection("MinimalPlugin")[nameof(Config.Token)] ?? "";
	}
	public void Setup(WebApplication host)
	{
		IDiscordClientService discordClientService = host.Services.GetRequiredService<IDiscordClientService>();
		discordClientService.SocketClient.Log += this.Log;
		discordClientService.SocketClient.Ready += this.Client_Ready;
	}
	public void Unload(WebApplication host, bool isSafeUnload)
	{
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
