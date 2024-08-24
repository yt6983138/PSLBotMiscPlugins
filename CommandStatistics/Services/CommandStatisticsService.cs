using Newtonsoft.Json;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.DependencyInjection;
using PSLDiscordBot.Framework.ServiceBase;

namespace CommandStatistics.Services;

public class CommandStatisticInfo(int useCount)
{
	public int UseCount { get; set; } = useCount;

	[JsonIgnore]
	public bool ExistsAnymore { get; set; } = true;
}
public class CommandStatisticsService : FileManagementServiceBase<Dictionary<string, CommandStatisticInfo>>
{
	[Inject]
	public CommandResolveService CommandResolveService { get; set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
	public CommandStatisticsService()
		: base("./MiscPlugins/CommandStatistics.json")
	{
		this.AutoSaveIntervalMs = 1000 * 60 * 5; // 5min
	}
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

	public CommandStatisticInfo GetOrAddNew(string name)
	{
		if (this.Data.TryGetValue(name, out CommandStatisticInfo? result))
			return result;

		CommandStatisticInfo newOne = new(0);
		this.Data.Add(name, newOne);
		return newOne;
	}

	public override Dictionary<string, CommandStatisticInfo> Generate()
	{
		return new();
	}

	protected override bool Load(out Dictionary<string, CommandStatisticInfo> data)
	{
		bool result = TryLoadJsonAs(this.InfoOfFile, out Dictionary<string, CommandStatisticInfo> rawData);

		if (!result)
			goto BypassExistsCheck;

		foreach (KeyValuePair<string, CommandStatisticInfo> item in rawData)
		{
			if (this.CommandResolveService.GlobalCommands.ContainsKey(item.Key)
				|| this.CommandResolveService.GuildCommands.ContainsKey(item.Key)
				|| this.CommandResolveService.UserCommands.ContainsKey(item.Key)
				|| this.CommandResolveService.MessageCommands.ContainsKey(item.Key))
			{
				continue;
			}

			item.Value.ExistsAnymore = false;
		}

	BypassExistsCheck:
		data = rawData;
		return result;
	}

	protected override void Save(Dictionary<string, CommandStatisticInfo> data)
	{
		WriteToFile(this.InfoOfFile, data);
	}
}
