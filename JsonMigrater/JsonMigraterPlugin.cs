using PSLDiscordBot.Framework;

namespace JsonMigrater;

public class JsonMigraterPlugin : IPlugin
{
	string IPlugin.Name => "Json Migrater";
	string IPlugin.Description => "Migrate json userdatas to sql data";
	string IPlugin.Version => "0.0.0.1";
	int IPlugin.VersionId => 0x00_00_00_01;
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => 114514_2;

	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;

	void IPlugin.Load(Program program, bool isDynamicLoading)
	{
	}

	void IPlugin.Unload(Program program, bool isDynamicUnloading)
	{
	}
}
