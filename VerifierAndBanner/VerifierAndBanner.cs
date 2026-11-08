using Discord;
using Discord.WebSocket;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using VerifierAndBanner.Config;

namespace VerifierAndBanner;
public class VerifierAndBanner : IPlugin<VerifierAndBanner>
{
	private readonly IDiscordClientService _discordClientService;
	private readonly IOptions<VABConfig> _config;

	public SocketGuild Guild { get; set; } = null!;

	public SocketTextChannel OperationAnnouncementChannel { get; set; } = null!;
	public SocketTextChannel AntiRaidChannel { get; set; } = null!;
	public SocketTextChannel VerifyChannel { get; set; } = null!;

	public static string Name => "Verifer And Banner";
	public static string Description => "Verify new members for my server; Also banning raiders";
	public static string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public static int Priority => -20;

	private VerifierAndBanner(IDiscordClientService discordClientService, IOptions<VABConfig> config)
	{
		this._discordClientService = discordClientService;
		this._config = config;
	}

	public static Task Load(WebApplicationBuilder hostBuilder)
	{
		hostBuilder.Services.Configure<VABConfig>(
			hostBuilder.Configuration.GetSection("VABConfig"));
		hostBuilder.Services.Configure<DiscordClientServiceConfig>(config =>
		{
			config.SocketConfig.GatewayIntents |= GatewayIntents.AllUnprivileged | GatewayIntents.MessageContent;
		});
		return Task.CompletedTask;
	}
	public static Task<VerifierAndBanner> Setup(WebApplication host)
	{
		VerifierAndBanner plugin = new(
			host.Services.GetRequiredService<IDiscordClientService>(),
			host.Services.GetRequiredService<IOptions<VABConfig>>());

		plugin._discordClientService.SocketClient.MessageReceived += plugin.SocketClient_MessageReceived;
		plugin._discordClientService.SocketClient.Ready += plugin.SocketClient_Ready;
		return Task.FromResult(plugin);
	}
	public Task Unload(WebApplication host, bool isSafeUnload)
	{
		return Task.CompletedTask;
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
