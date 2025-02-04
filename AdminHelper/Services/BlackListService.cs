using Discord.WebSocket;
using Microsoft.Extensions.Logging;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.DependencyInjection;
using yt6983138.Common;

namespace AdminHelper.Services;
public class BlackListService : InjectableBase // TODO: implement save function
{
	public delegate bool ShouldDenyDelegate(SocketSlashCommand arg);

	private static readonly EventId EventId = new(114514191, nameof(BlackListService));

	private readonly CommandResolveService _commandResolveService;
	public AdminConfigService _adminConfigService = null!;
	public Logger _logger = null!;

	public Dictionary<ulong, ShouldDenyDelegate> BlackListedUsers { get; set; } = new();

	public BlackListService(CommandResolveService service, AdminConfigService config, Logger logger)
	{
		this._commandResolveService = service;
		this._adminConfigService = config;
		this._logger = logger;
		service.BeforeSlashCommandExecutes += this.Service_BeforeSlashCommandExecutes;
	}
	~BlackListService()
	{
		this.DetachEvent();
	}

	public void DetachEvent()
		=> this._commandResolveService.BeforeSlashCommandExecutes -= this.Service_BeforeSlashCommandExecutes;
	public void BlockUser(ulong userId, ShouldDenyDelegate denyDelegate)
		=> this.BlackListedUsers[userId] = denyDelegate;

	private async void Service_BeforeSlashCommandExecutes(object? sender, PSLDiscordBot.Framework.MiscEventArgs.SlashCommandEventArgs e)
	{
		SocketSlashCommand arg = e.SocketSlashCommand;
		if (this.BlackListedUsers.ContainsKey(arg.User.Id))
		{
			if (this.BlackListedUsers[arg.User.Id].Invoke(arg))
			{
				e.Canceled = true;
				await e.SocketSlashCommand.RespondAsync(this._adminConfigService.Data.BlackListedUserMessage[arg.UserLocale]);
				this._logger.Log(LogLevel.Information, EventId, $"Blacklisted user {arg.User.Id} tried to execute command {arg.CommandName}");
			}
		}
	}
}
