using Discord.WebSocket;
using Microsoft.Extensions.Logging;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.DependencyInjection;
using yt6983138.Common;

namespace AdminHelper.Services;
public class BlackListService : InjectableBase // TODO: implement save function
{
	public delegate bool ShouldDenyDelegate(SocketSlashCommand arg);

	private static readonly EventId EventId = new(114514191, nameof(BlackListService));

	private readonly CommandResolveService _commandResolveService;

	[Inject]
	public AdminConfigService AdminConfigService { get; } = null!;
	[Inject]
	public Logger Logger { get; } = null!;

	public Dictionary<ulong, ShouldDenyDelegate> BlackListedUsers { get; set; } = new();

	public BlackListService(CommandResolveService service)
	{
		this._commandResolveService = service;
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
				await e.SocketSlashCommand.QuickReply(this.AdminConfigService.Data.BlackListedUserMessage);
				this.Logger.Log(LogLevel.Information, EventId, $"Blacklisted user {arg.User.Id} tried to execute command {arg.CommandName}");
			}
		}
	}
}
