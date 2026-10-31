using AdminHelper.Services;
using Discord.Rest;

namespace AdminHelper.Commands;

[AddToGlobal]
public class ShutDownCommand : AdminCommandBase
{
	private readonly ShutdownService _shutdownService;

	public ShutDownCommand(IServiceProvider provider, ShutdownService shutdownService)
		: base(provider)
	{
		this._shutdownService = shutdownService;
	}

	public override OneOf<string, LocalizedString> PSLName => "shutdown";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] Shut down the bot.";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder;

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		RestInteractionMessage? message = null;
		// this command itself is registered in RunningTasks by the dispatcher, hence 1
		await this._shutdownService.RunAsync(
			1,
			async remaining =>
			{
				string content = $"Shut down initialized, {remaining} tasks running...";
				if (message is null)
					message = await arg.ModifyOriginalResponseAsync(x => x.Content = content);
				else
					await message.ModifyAsync(msg => msg.Content = content);
			},
			async completed => await message!.ModifyAsync(msg => msg.Content = completed ? "Shut down." : "Operation canceled."));
	}
}

