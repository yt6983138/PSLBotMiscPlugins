using Microsoft.EntityFrameworkCore;
using PSLDiscordBot.Framework.BuiltInServices;

namespace AdminHelper.Services;

[PrimaryKey(nameof(CommandName))]
public class CommandStatisticInfo
{
	/// <summary>
	/// this is now full command path of the command (ex. "leaderboard rank-using rks")
	/// </summary>
	public string CommandName { get; set; } = string.Empty;
	public int UseCount { get; set; }
}
public class CommandStatisticsService
{
	private readonly ICommandResolveService _commandResolveService;
	private List<BasicCommandBase>? _commands;

	public CommandStatisticsService(ICommandResolveService commandResolveService)
	{
		this._commandResolveService = commandResolveService;
	}

	public Requester NewRequester() =>
		new(this._commandResolveService, this);

	public class Requester : DbContext
	{
		private readonly ICommandResolveService _commandResolveService;
		private readonly CommandStatisticsService _parent;

		private DbSet<CommandStatisticInfo> CommandStatistic { get; set; }

		internal Requester(ICommandResolveService commandResolveService, CommandStatisticsService parent)
		{
			this._commandResolveService = commandResolveService;
			this._parent = parent;
			this.Database.EnsureCreated();
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlite("Data Source=./Administration/CommandStatistics.db")
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
			this._parent._commands ??= this._commandResolveService.GetAllGlobalCommands();

			List<CommandStatisticInfo> stats = await this.GetAllReadonly();
			return stats
				.Where(x => this._parent._commands.Any(y => CanShow(y, x)))
				.ToList();

			static bool CanShow(BasicCommandBase @base, CommandStatisticInfo info)
			{
				string[] parts = info.CommandName.Split(' ');
				if (@base.Name != parts[0]) return false;

				if (parts.Length == 1) return true; // root command, no subcommand

				// fuck discord.net not providing a common interface for both option builder and root builder
				SlashCommandOptionBuilder? current = @base.CompleteBuilder.Options.FirstOrDefault(x => MatchSubcommand(x, parts[1]));
				for (int i = 2; i < parts.Length; i++)
				{
					string part = parts[i];
					if (current is null) return false;

					current = current.Options.FirstOrDefault(x => MatchSubcommand(x, part));
				}

				if (current is null) return false;

				return true;
			}
			static bool MatchSubcommand(SlashCommandOptionBuilder option, string name)
			{
				if (option.Name != name) return false;
				return option.Type == ApplicationCommandOptionType.SubCommand || option.Type == ApplicationCommandOptionType.SubCommandGroup;
			}
		}
	}
}
