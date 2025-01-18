using CommandStatistics.Services;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.DependencyInjection;

namespace CommandStatistics;
public class CommandStatisticsPlugin : InjectableBase, IPlugin
{
	private CommandStatisticsService _commandStatisticsService = null!;

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
	[Inject]
	public CommandResolveService CommandResolveService { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

	string IPlugin.Name => "Command Statistics";
	string IPlugin.Description => "Save command statistics and provide a command to see it";
	Version IPlugin.Version => new(1, 0, 0, 0);
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => 114514_9;

	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;

	void IPlugin.Load(Program program, bool isDynamicLoading)
	{
		this.CommandResolveService.BeforeSlashCommandExecutes += this.CommandResolveService_BeforeSlashCommandExecutes;
		program.AfterMainInitialize += this.Program_AfterMainInitialize;
	}
	void IPlugin.Unload(Program program, bool isDynamicUnloading)
	{
		this._commandStatisticsService.Save();
	}

	private void Program_AfterMainInitialize(object? sender, EventArgs e)
	{
		this._commandStatisticsService = new();
		InjectableBase.AddSingleton(this._commandStatisticsService);
	}
	private void CommandResolveService_BeforeSlashCommandExecutes(object? sender, PSLDiscordBot.Framework.MiscEventArgs.SlashCommandEventArgs e)
	{
		if (e.Canceled) return;

		CommandStatisticInfo info = this._commandStatisticsService.GetOrAddNew(e.SocketSlashCommand.CommandName);
		info.UseCount++;
	}
}
