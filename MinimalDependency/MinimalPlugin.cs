using Discord;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;

namespace MinimalDependency;
public class MinimalPlugin : IPlugin
{
	private const string ConfigLocation = "./MiscPlugins/Minimal.json";

	private DiscordClientService _discordClientService = null!;

	public bool Initialized { get; private set; }
	public IOptions<Config> Config { get; set; } = null!;


	string IPlugin.Name => "PSLDiscordBot Minimal";
	string IPlugin.Description => "Minimal implementation for PSLDiscord bot";
	Version IPlugin.Version => new(1, 0, 0, 0);
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";

	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;
	int IPlugin.Priority => -1;

	public void Load(WebApplicationBuilder hostBuilder, bool isDynamicLoading)
	{
		hostBuilder.Services.Configure<Config>(
			hostBuilder.Configuration.GetSection("MinimalPlugin"));
	}
	public void Setup(IHost host)
	{
		host.Services.GetRequiredService<Program>().AfterMainInitialize += this.MinimalPlugin_AfterMainInitialize;
	}
	public void Unload(IHost host, bool isDynamicUnloading)
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
	private void MinimalPlugin_AfterMainInitialize(object? sender, EventArgs e)
	{
		this._discordClientService.SocketClient.LoginAsync(TokenType.Bot, this.Config.Value.Token).Wait();
		this._discordClientService.RestClient.LoginAsync(TokenType.Bot, this.Config.Value.Token).Wait();
		this._discordClientService.SocketClient.StartAsync().Wait();

		this._discordClientService.SocketClient.Log += this.Log;
		this._discordClientService.SocketClient.Ready += this.Client_Ready;
	}
}
