using CommandStatistics.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;

namespace CommandStatistics;
public class CommandStatisticsPlugin : IPlugin
{
	private CommandStatisticsService _commandStatisticsService = null!;
	private CommandResolveService _commandResolveService = null!;

	string IPlugin.Name => "Command Statistics";
	string IPlugin.Description => "Save command statistics and provide a command to see it";
	Version IPlugin.Version => new(1, 0, 0, 0);
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => 114514_9;

	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;

	private void CommandResolveService_BeforeSlashCommandExecutes(object? sender, PSLDiscordBot.Framework.MiscEventArgs.SlashCommandEventArgs e)
	{
		if (e.Canceled) return;

		CommandStatisticInfo info = this._commandStatisticsService.GetOrAddNew(e.SocketSlashCommand.CommandName);
		info.UseCount++;
	}

	public void Load(WebApplicationBuilder hostBuilder, bool isDynamicLoading)
	{
		this._commandResolveService.BeforeSlashCommandExecutes += this.CommandResolveService_BeforeSlashCommandExecutes;
		hostBuilder.Services.AddSingleton<CommandStatisticsService>();
	}
	public void Setup(IHost host)
	{
		this._commandStatisticsService = host.Services.GetRequiredService<CommandStatisticsService>();
		this._commandResolveService = host.Services.GetRequiredService<CommandResolveService>();
	}

	public void Unload(IHost host, bool isDynamicUnloading)
	{
		this._commandStatisticsService.Save();
	}
}
