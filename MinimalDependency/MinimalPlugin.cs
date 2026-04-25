using Discord;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;

namespace MinimalDependency;
public class MinimalPlugin : IPlugin
{
	private const string ConfigLocation = "./MiscPlugins/Minimal.json";

	public bool Initialized { get; private set; }
	public IOptions<Config> Config { get; set; } = null!;


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
	public void ConfigureDiscordClient(DiscordClientServiceConfig config)
	{
		config.Token = this.Config.Value.Token;
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
