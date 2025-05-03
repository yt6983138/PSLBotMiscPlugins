using Discord;
using Discord.WebSocket;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using VerifierAndBanner.Config;

namespace VerifierAndBanner;
public class VerifierAndBanner : IPlugin
{
	private IDiscordClientService _discordClientService = null!;
	private IOptions<VABConfig> _config = null!;

	public SocketGuild Guild { get; set; } = null!;

	public SocketTextChannel OperationAnnouncementChannel { get; set; } = null!;
	public SocketTextChannel AntiRaidChannel { get; set; } = null!;
	public SocketTextChannel VerifyChannel { get; set; } = null!;

	string IPlugin.Name => "Verifer And Banner";
	string IPlugin.Description => "Verify new members for my server; Also banning raiders";
	Version IPlugin.Version => new(1, 0, 0, 0);
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => -20;

	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;

	public void Load(WebApplicationBuilder hostBuilder, bool isDynamicLoading)
	{
		hostBuilder.Services.Configure<VABConfig>(
			hostBuilder.Configuration.GetSection("VABConfig"));
	}
	public void Setup(IHost host)
	{
		this._discordClientService = host.Services.GetRequiredService<IDiscordClientService>();
		this._config = host.Services.GetRequiredService<IOptions<VABConfig>>();

		this._discordClientService.SocketClient = new(new()
		{
			GatewayIntents = GatewayIntents.AllUnprivileged | GatewayIntents.MessageContent,
			//AlwaysDownloadUsers = true
		});

		this._discordClientService.SocketClient.MessageReceived += this.SocketClient_MessageReceived;
		this._discordClientService.SocketClient.Ready += this.SocketClient_Ready;
	}
	public void Unload(IHost host, bool isDynamicUnloading)
	{
	}

	private Task SocketClient_Ready()
	{
		this.Guild = this._discordClientService.SocketClient.GetGuild(this._config.Value.GuildId);
		this.OperationAnnouncementChannel = this.Guild.GetTextChannel(this._config.Value.OperationAnnouncementChannelId);
		this.VerifyChannel = this.Guild.GetTextChannel(this._config.Value.VerifyChannelId);
		this.AntiRaidChannel = this.Guild.GetTextChannel(this._config.Value.AntiRaidChannelId);

		return this.OperationAnnouncementChannel is null
			|| this.VerifyChannel is null
			|| this.AntiRaidChannel is null
			? throw new NullReferenceException()
			: Task.CompletedTask;
	}
	private async Task SocketClient_MessageReceived(SocketMessage arg)
	{
		if (arg.Channel is not SocketTextChannel channel)
			return;
		if (channel.Guild.Id != this.Guild.Id)
			return;
		if (arg.Author is not SocketGuildUser guildUser)
			return;
		if (guildUser.IsBot)
			return;

		if (channel.Id == this.VerifyChannel.Id)
		{
			if (arg.CleanContent.Trim() != this._config.Value.VerifyKeyword)
			{
				Discord.Rest.RestUserMessage sent = await channel.SendMessageAsync($"Sorry, you failed to verify, type " +
					$"`{this._config.Value.VerifyKeyword}` to verify.", messageReference: new(arg.Id));

				_ = Task.Run(async () =>
				{
					await Task.Delay(10000);
					await channel.DeleteMessagesAsync([sent, arg]);
				});
				return;
			}

			await arg.DeleteAsync();
			await guildUser.AddRolesAsync(this._config.Value.RolesToAdd);
			return;
		}
		if (channel.Id == this.AntiRaidChannel.Id)
		{
			await this.Guild.AddBanAsync(guildUser, this._config.Value.BanPruneDays, "Triggered anti raid");
			await this.OperationAnnouncementChannel.SendMessageAsync(
				$"User `{guildUser.Id}` aka {guildUser.GlobalName} triggered anti raid and was banned.");
			return;
		}
	}

}
