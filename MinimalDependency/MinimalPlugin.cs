using Discord;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.DependencyInjection;

namespace MinimalDependency;
public class MinimalPlugin : InjectableBase, IPlugin
{
	private const string ConfigLocation = "./MiscPlugins/Minimal.json";

	#region Injection
	[Inject]
	public DiscordClientService DiscordClientService { get; set; }
	#endregion

	public bool Initialized { get; private set; }
	public Config Config { get; set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
	public MinimalPlugin()
		: base()
	{
	}
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

	#region Interface

	#region Properties
	string IPlugin.Name => "PSLDiscordBot Minimal";
	string IPlugin.Description => "Minimal implementation for PSLDiscord bot";
	string IPlugin.Version => "0.0.0.1";
	int IPlugin.VersionId => 0x00_00_00_01;
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";

	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;
	int IPlugin.Priority => -1;
	#endregion

	void IPlugin.Load(Program program, bool isDynamicLoading)
	{
		try
		{
			this.Config = JsonConvert.DeserializeObject<Config>(File.ReadAllText(ConfigLocation))!;
			if (this.Config is null)
				throw new NullReferenceException();
		}
		catch
		{
			this.Config = new();
			File.WriteAllText(ConfigLocation, JsonConvert.SerializeObject(this.Config));
			throw;
		}

		program.AfterMainInitialize += this.Program_AfterMainInitialize;

		this.DiscordClientService.SocketClient.Ready += this.Client_Ready;
		this.DiscordClientService.SocketClient.Log += this.Log;
	}

	void IPlugin.Unload(Program program, bool isDynamicUnloading)
	{
	}
	#endregion

	#region Event Handler
	private void Program_AfterMainInitialize(object? sender, EventArgs e)
	{
		this.DiscordClientService.SocketClient.LoginAsync(TokenType.Bot, this.Config.Token).Wait();
		this.DiscordClientService.RestClient.LoginAsync(TokenType.Bot, this.Config.Token).Wait();
		this.DiscordClientService.SocketClient.StartAsync().Wait();
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
	#endregion
}
