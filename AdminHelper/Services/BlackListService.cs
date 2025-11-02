using Discord.WebSocket;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Framework.BuiltInServices;

namespace AdminHelper.Services;
public class BlackListService // TODO: implement save function
{
	public delegate bool ShouldDenyDelegate(SocketSlashCommand arg);

	private static readonly EventId EventId = new(114514191, nameof(BlackListService));

	private readonly ICommandResolveService _commandResolveService;
	private readonly IOptions<AdminConfig> _adminConfig = null!;
	private readonly ILogger<BlackListService> _logger = null!;

	public Dictionary<ulong, ShouldDenyDelegate> BlackListedUsers { get; set; } = [];
	public List<string> BlackListedCommands { get; set; } = [];

	public BlackListService(ICommandResolveService commandResolveService, IOptions<AdminConfig> config, ILogger<BlackListService> logger)
	{
		this._commandResolveService = commandResolveService;
		this._adminConfig = config;
		this._logger = logger;
		commandResolveService.BeforeSlashCommandExecutes += this.Service_BeforeSlashCommandExecutes;
	}
	~BlackListService()
	{
		this.DetachEvent();
	}

	public void DetachEvent()
		=> this._commandResolveService.BeforeSlashCommandExecutes -= this.Service_BeforeSlashCommandExecutes;
	public void BlockUser(ulong userId, ShouldDenyDelegate denyDelegate)
		=> this.BlackListedUsers[userId] = denyDelegate;
	public void BlockCommand(string commandName)
		=> this.BlackListedCommands.Add(commandName);

	private async void Service_BeforeSlashCommandExecutes(object? sender, PSLDiscordBot.Framework.MiscEventArgs.SlashCommandEventArgs e)
	{
		SocketSlashCommand arg = e.SocketSlashCommand;
		if (this.BlackListedCommands.Contains(arg.CommandName))
		{
			e.Canceled = true;
			await e.SocketSlashCommand.RespondAsync(this._adminConfig.Value.BlackListedCommandMessage[arg.UserLocale]);
			this._logger.LogInformation(EventId, "Command {commandName} is blacklisted, canceling execution for user {id}", arg.CommandName, arg.User.Id);
			return;
		}

		if (this.BlackListedUsers.ContainsKey(arg.User.Id))
		{
			if (this.BlackListedUsers[arg.User.Id].Invoke(arg))
			{
				e.Canceled = true;
				await e.SocketSlashCommand.RespondAsync(this._adminConfig.Value.BlackListedUserMessage[arg.UserLocale]);
				this._logger.LogInformation(EventId, "Blacklisted user {id} tried to execute command {commandName}", arg.User.Id, arg.CommandName);
			}
		}
	}
}
