﻿using AdminHelper.Services;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.DependencyInjection;
using yt6983138.Common;

namespace AdminHelper;

public class AdminHelperPlugin : InjectableBase, IPlugin
{
	string IPlugin.Name => "Admin helper";
	string IPlugin.Description => "Help admins do shit";
	Version IPlugin.Version => new(1, 1, 0, 0);
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => 114514_1;

	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;

	private AdminConfigService _config = new();

	void IPlugin.Load(Program program, bool isDynamicLoading)
	{
		InjectableBase.AddSingleton(this._config);
		program.AfterArgParse += (_, _2) =>
			AddSingleton(new BlackListService(GetSingleton<CommandResolveService>(), this._config, GetSingleton<Logger>()));
	}
	void IPlugin.Unload(Program program, bool isDynamicUnloading)
	{
	}
}
