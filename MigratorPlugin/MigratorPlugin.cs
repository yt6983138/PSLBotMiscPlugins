using Microsoft.AspNetCore.Builder;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Models.SongAlias;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using System.Text.Json;

namespace MigratorPlugin;

public class MigratorPlugin : IPlugin<MigratorPlugin>
{
	public static string Name => "Fun commands";
	public static string Description => "Fun commands like /poke";
	public static string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public static int Priority => 114514_0000;

	public static Task Load(WebApplicationBuilder hostBuilder)
	{
		return Task.CompletedTask;
	}
	public static Task<MigratorPlugin> Setup(WebApplication host)
	{
		MigratorPlugin plugin = new();
		ILogger<MigratorPlugin> logger = host.Services.GetRequiredService<ILogger<MigratorPlugin>>();
		ILifetimeService lifetimeService = host.Services.GetRequiredService<ILifetimeService>();
		lifetimeService.AfterMainInitialize += async (_, _2) =>
		{
			logger.LogInformation("Starting migration...");
			try
			{
				await plugin.MigrateAlias(host, logger);
			}
			catch (Exception ex)
			{
				logger.LogError(ex, "Error occurred while migrating.");
			}
			logger.LogInformation("Migration completed.");
		};
		return Task.FromResult(plugin);
	}
	public Task Unload(WebApplication host, bool isSafeUnload) => Task.CompletedTask;

	public async Task MigrateAlias(WebApplication host, ILogger<MigratorPlugin> logger)
	{
		// 2026/06/19
		AliasService aliasService = host.Services.GetRequiredService<AliasService>();
		IOptions<Config> pslConfig = host.Services.GetRequiredService<IOptions<Config>>();

		using SqliteConnection connection = new(pslConfig.Value.PSLDbConnectionString);
		connection.Open();

		SqliteCommand readCmd = connection.CreateCommand();
		readCmd.CommandText = "SELECT SongId, Alias FROM SongAlias";
		using SqliteDataReader reader = await readCmd.ExecuteReaderAsync();
		List<(string, string[])> aliases = [];
		while (await reader.ReadAsync())
		{
			string id = reader.GetString(0);
			string alias = reader.GetString(1);
			string[] aliasArray = JsonSerializer.Deserialize<string[]>(alias)!;
			aliases.Add((id, aliasArray));
		}

		using AliasService.StaticTableRequester staticRequester = aliasService.GetStaticTableRequester();
		using AliasService.DynamicTableRequester dynamicRequester = aliasService.GetDynamicTableRequester(AliasTableIdType.Global, 0);
		foreach ((string, string[]) item in aliases)
		{
			List<Guid> keys = [];
			foreach (string item1 in item.Item2)
			{
				SongAliasMetadata metadata = new(Guid.NewGuid(), DateTime.Now)
				{
					OperationType = OperationType.Modify,
					OperationData = item1,
					OperatorId = pslConfig.Value.AdminUserId
				};
				staticRequester.AliasMetadata.Add(metadata);
				keys.Add(metadata.AliasId);
			}

			SongAliasData model = new(item.Item1, item.Item2.ToList(), keys);
			dynamicRequester.Aliases.Add(model);
		}
		staticRequester.SaveChanges();
		dynamicRequester.SaveChanges();
	}
}
