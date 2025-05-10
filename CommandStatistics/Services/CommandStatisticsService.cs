using Microsoft.EntityFrameworkCore;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.CommandBase;

namespace CommandStatistics.Services;

[PrimaryKey(nameof(CommandName))]
public class CommandStatisticInfo
{
	public string CommandName { get; set; } = string.Empty;
	public int UseCount { get; set; }
}
public class CommandStatisticsService : DbContext
{
	private readonly ICommandResolveService _commandResolveService;
	private List<BasicCommandBase>? _commands;

	private DbSet<CommandStatisticInfo> CommandStatistic { get; set; }

	public CommandStatisticsService(ICommandResolveService commandResolveService)
	{
		this._commandResolveService = commandResolveService;
		this.Database.EnsureCreated();
	}

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		optionsBuilder.UseSqlite("Data Source=./MiscPlugins/CommandStatistics.db")
			.UseQueryTrackingBehavior(QueryTrackingBehavior.TrackAll);
	}
	public async Task<CommandStatisticInfo> GetOrAddNew(string commandName)
	{
		CommandStatisticInfo? value = await this.CommandStatistic.FindAsync(commandName);
		if (value is null)
		{
			value = new CommandStatisticInfo() { CommandName = commandName };
			await this.CommandStatistic.AddAsync(value);
			await this.SaveChangesAsync();
		}

		return value;
	}
	public async Task<List<CommandStatisticInfo>> GetAllReadonly()
	{
		return await this.CommandStatistic.AsNoTracking().ToListAsync();
	}
	public async Task<List<CommandStatisticInfo>> GetAllExistingReadonly()
	{
		this._commands ??= this._commandResolveService.GetAllGlobalCommands();

		List<CommandStatisticInfo> stats = await this.GetAllReadonly();
		return stats
			.Where(x => this._commands.Any(y => y.Name == x.CommandName))
			.ToList();
	}
}
