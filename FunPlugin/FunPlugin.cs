﻿using PSLDiscordBot.Framework;

namespace FunPlugin;

public class FunPlugin : IPlugin
{
	string IPlugin.Name => "Fun commands";
	string IPlugin.Description => "Fun commands like /poke";
	string IPlugin.Version => "0.0.0.1";
	int IPlugin.VersionId => 0x00_00_00_01;
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => 114514_0;

	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;

	void IPlugin.Load(Program program, bool isDynamicLoading)
	{
	}

	void IPlugin.Unload(Program program, bool isDynamicUnloading)
	{
	}
}