using Discord;
using Discord.WebSocket;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.DependencyInjection;
using VerifierAndBanner.Config;

namespace VerifierAndBanner;
public class VerifierAndBanner : IPlugin
{
	#region Injection
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
	private DiscordClientService _discordClientService;
	private VABConfigService _configService;
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
	#endregion

	#region Converted Properties
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
	public SocketGuild Guild { get; set; }

	public SocketTextChannel OperationAnnouncementChannel { get; set; }
	public SocketTextChannel AntiRaidChannel { get; set; }
	public SocketTextChannel VerifyChannel { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
	#endregion

	#region Interface
	string IPlugin.Name => "Verifer And Banner";
	string IPlugin.Description => "Verify new members for my server; Also banning raiders";
	Version IPlugin.Version => new(1, 0, 0, 0);
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => -20;

	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;

	void IPlugin.Load(Program program, bool isDynamicLoading)
	{
		this._discordClientService = InjectableBase.GetSingleton<DiscordClientService>();

		this._configService = new();
		InjectableBase.AddSingleton(this._configService);

		this._discordClientService.SocketClient = new(new()
		{
			GatewayIntents = GatewayIntents.AllUnprivileged | GatewayIntents.MessageContent,
			//AlwaysDownloadUsers = true
		});

		this._discordClientService.SocketClient.MessageReceived += this.SocketClient_MessageReceived;
		this._discordClientService.SocketClient.Ready += this.SocketClient_Ready;
	}
	void IPlugin.Unload(Program program, bool isDynamicUnloading)
	{
	}
	#endregion

	private Task SocketClient_Ready()
	{
		this.Guild = this._discordClientService.SocketClient.GetGuild(this._configService.Data.GuildId);
		this.OperationAnnouncementChannel = this.Guild.GetTextChannel(this._configService.Data.OperationAnnouncementChannelId);
		this.VerifyChannel = this.Guild.GetTextChannel(this._configService.Data.VerifyChannelId);
		this.AntiRaidChannel = this.Guild.GetTextChannel(this._configService.Data.AntiRaidChannelId);

		if (this.OperationAnnouncementChannel is null
			|| this.VerifyChannel is null
			|| this.AntiRaidChannel is null)
		{
			throw new NullReferenceException();
		}

		return Task.CompletedTask;
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
			if (arg.CleanContent.Trim() != this._configService.Data.VerifyKeyword)
			{
				Discord.Rest.RestUserMessage sent = await channel.SendMessageAsync($"Sorry, you failed to verify, type " +
					$"`{this._configService.Data.VerifyKeyword}` to verify.", messageReference: new(arg.Id));

				_ = Task.Run(async () =>
				{
					await Task.Delay(10000);
					await channel.DeleteMessagesAsync([sent, arg]);
				});
				return;
			}

			await arg.DeleteAsync();
			await guildUser.AddRolesAsync(this._configService.Data.RolesToAdd);
			return;
		}
		if (channel.Id == this.AntiRaidChannel.Id)
		{
			await this.Guild.AddBanAsync(guildUser, this._configService.Data.BanPruneDays, "Triggered anti raid");
			await this.OperationAnnouncementChannel.SendMessageAsync(
				$"User `{guildUser.Id}` aka {guildUser.GlobalName} triggered anti raid and was banned.");
			return;
		}
	}
}
