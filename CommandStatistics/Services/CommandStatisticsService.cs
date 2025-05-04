using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.CommandBase;
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
	private readonly ICommandResolveService _commandResolveService;

	public CommandStatisticsService(ICommandResolveService commandResolveService)
		: base("./MiscPlugins/CommandStatistics.json")
	{
		this.AutoSaveIntervalMs = 1000 * 60 * 5; // 5min
		this._commandResolveService = commandResolveService;
	}

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
		return [];
	}

	protected override bool Load(out Dictionary<string, CommandStatisticInfo> data)
	{
		bool result = this.TryLoadJsonAs(this.InfoOfFile, out Dictionary<string, CommandStatisticInfo> rawData);

		if (!result)
			goto BypassExistsCheck;

		foreach (KeyValuePair<string, CommandStatisticInfo> item in rawData)
		{
			if (this._commandResolveService.GlobalCommands.GetServices<BasicCommandBase>().Any(x => x.Name == item.Key)
				//|| this._commandResolveService.GuildCommands.GetServices<BasicCommandBase>().Any(x => x.Name == item.Key)
				|| this._commandResolveService.UserCommands.GetServices<BasicUserCommandBase>().Any(x => x.Name == item.Key)
				|| this._commandResolveService.MessageCommands.GetServices<BasicMessageCommandBase>().Any(x => x.Name == item.Key))
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
		this.WriteJsonToFile(this.InfoOfFile, data);
	}
}
