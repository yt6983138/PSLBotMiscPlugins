using AdminHelper.Models;
using CodingSeb.ExpressionEvaluator;
using Discord;
using Discord.WebSocket;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.Localization;
using PSLDiscordBot.Framework.ServiceBase;
using System.Diagnostics.CodeAnalysis;

namespace AdminHelper.Services;

internal static class EvaluatorExtensions
{
	[Obsolete("only for evaluation, do not use in code")]
	public static bool IsIn<T>(T value, params T[] collection)
	{
		return collection.Contains(value);
	}
}
/// <summary>
/// please dont modify this directly
/// </summary>
/// <param name="Data"></param>
/// <param name="LastInt"></param>
public record class BlackListSaveData(Dictionary<int, BlackListCondition> Data, int LastInt)
{
	public int LastInt { get; set; } = LastInt;
};
// storing data in json since we need to iterate all black list conditions when checking
public class BlackListService : FileManagementServiceBase<BlackListSaveData>, IDisposable
{
	private record class BlackListEvaluatorContext(
		SocketUser? User,
		ISocketMessageChannel? Channel,
		SocketGuild? Guild,
		SocketSlashCommand Command,
		BlackListCondition? Condition);

	private static readonly EventId EventId = new(114514191, nameof(BlackListService));

	private readonly ICommandResolveService _commandResolveService;
	private readonly LocalizationService _localization;
	private readonly IOptions<AdminConfig> _config;
	private readonly ILogger<BlackListService> _logger;
	private readonly IDiscordClientService _discordClientService;
	private readonly PSLPlugin _pslPlugin;
	private readonly ScopedSemaphoreSlim _dataLock = new(1, 1);

	public bool EventRegistered { get; private set; } = true;
	public ExpressionEvaluator Evaluator { get; } = new();

	public BlackListService(
		ICommandResolveService commandResolveService,
		LocalizationService localization,
		IOptions<AdminConfig> config,
		ILogger<BlackListService> logger,
		IDiscordClientService discordClientService,
		PSLPlugin pslPlugin) : base("./Administration/BlackList.json")
	{
		this._commandResolveService = commandResolveService;
		this._localization = localization;
		this._config = config;
		this._logger = logger;
		this._discordClientService = discordClientService;
		this._pslPlugin = pslPlugin;

		commandResolveService.BeforeSlashCommandExecutes += this.CommandResolveService_BeforeSlashCommandExecutes;

		this.Evaluator.Types.Add(typeof(PSLPlugin));
		this.Evaluator.Types.Add(typeof(LocalizedString));
		this.Evaluator.Types.Add(typeof(IPlugin));

		this.Evaluator.Types.Add(typeof(SocketUser));
		this.Evaluator.Types.Add(typeof(IChannel));

		this.Evaluator.StaticTypesForExtensionsMethods.Add(typeof(EvaluatorExtensions));
	}

	private async void CommandResolveService_BeforeSlashCommandExecutes(object? sender, PSLDiscordBot.Framework.MiscEventArgs.SlashCommandEventArgs e)
	{
		using ScopedSemaphoreSlim.Scope _ = await this._dataLock.EnterScopeAsync();
		SocketSlashCommand command = e.SocketSlashCommand;
		foreach (KeyValuePair<int, BlackListCondition> item in this.Data.Data)
		{
			try
			{
				if (await EvaluateCore(item)) break;
			}
			catch (Exception ex)
			{
				this._logger.LogError(EventId, ex, "Failed to evaluate black list condition with id {id}", item.Key);
				continue;
			}
		}

		// return: should break
		async Task<bool> EvaluateCore(KeyValuePair<int, BlackListCondition> item)
		{
			if (command.User.Id == this._pslPlugin.AdminUser?.Id)
				return true;

			SocketGuild? guild = command.GuildId is null ? null : this._discordClientService.SocketClient.GetGuild(command.GuildId.Value);
			if (this.ShouldBlackList(
				item.Value,
				command,
				command.User,
				command.Channel,
				guild,
				out OneOf<LocalizedString, string>? message))
			{
				e.Canceled = true;
				this._logger.LogInformation(EventId, "Blocked {user} from using {command} by black list id {id}", command.User.Username, command.CommandName, item.Key);

				OneOf<LocalizedString, string> innerMessage = message.Value;
				if (innerMessage.IsValue2)
				{
					await command.RespondAsync(innerMessage.Value2);
				}
				else
				{
					await command.RespondAsync(
						innerMessage.Value1.GetFormatted(command.UserLocale, new { Command = command, Condition = item.Value, Guild = guild }));
				}
				return true;
			}
			return false;
		}
	}

	public void Dispose()
	{
		if (!this.EventRegistered) return;

		this.EventRegistered = false;
		GC.SuppressFinalize(this);
		this.Save();
		this._commandResolveService.BeforeSlashCommandExecutes -= this.CommandResolveService_BeforeSlashCommandExecutes;
		this._dataLock.Dispose();
	}

	public void AddBlackList(BlackListCondition condition)
	{
		using ScopedSemaphoreSlim.Scope _ = this._dataLock.EnterScope();
		this.Data.Data.Add(++this.Data.LastInt, condition);
		this.Save();
	}
	public void RemoveBlackList(int id)
	{
		using ScopedSemaphoreSlim.Scope _ = this._dataLock.EnterScope();
		this.Data.Data.Remove(id);
		this.Save();
	}
	public void DisableBlackList(int id)
	{
		using ScopedSemaphoreSlim.Scope _ = this._dataLock.EnterScope();
		if (this.Data.Data.TryGetValue(id, out BlackListCondition? value))
			value.Disabled = true;
		this.Save();
	}
	public void EnableBlackList(int id)
	{
		using ScopedSemaphoreSlim.Scope _ = this._dataLock.EnterScope();
		if (this.Data.Data.TryGetValue(id, out BlackListCondition? value))
			value.Disabled = false;
		this.Save();
	}

	public bool ShouldBlackList(
		BlackListCondition condition,
		SocketSlashCommand command,
		SocketUser? user,
		ISocketMessageChannel? channel,
		SocketGuild? guild,
		[NotNullWhen(true)] out OneOf<LocalizedString, string>? message)
	{
		message = null;

		if (DateTime.Now > condition.ExpireDate || condition.Disabled)
			return false;

		BlackListEvaluatorContext context = new(user, channel, guild, command, condition);
		this.Evaluator.Context = context;

		bool expressionResult = this.Evaluator.Evaluate<bool>(condition.BlockExpression);
		if (!expressionResult) return false;

		if (Random.Shared.NextDouble() > condition.BlockChance)
			return false;

		const string LocalizationPrefix = "Localization:";

		message = this._config.Value.BlackListedDefaultMessage;
		if (condition.BlockedResponse is null)
			return true;

		if (!condition.BlockedResponse.StartsWith(LocalizationPrefix))
		{
			message = condition.BlockedResponse;
			return true;
		}

		string key = condition.BlockedResponse[LocalizationPrefix.Length..];
		if (!this._localization.Data.LocalizedStrings.TryGetValue(key, out LocalizedString? localized))
		{
			this._logger.LogWarning(EventId, "Failed to find localization for black list key {key}", key);
			return true;
		}

		message = localized;
		return true;
	}

	protected override bool Load(out BlackListSaveData data) =>
		this.TryLoadJsonAs(this.InfoOfFile, out data);
	protected override void Save(BlackListSaveData data) =>
		this.WriteJsonToFile(this.InfoOfFile, data);
	public override BlackListSaveData Generate() => new([], -1);
}
