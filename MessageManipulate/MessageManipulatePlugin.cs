using PSLDiscordBot.Framework;

namespace MessageManipulate;

public class MessageManipulatePlugin : IPlugin
{
	string IPlugin.Name => "Message manipulate";
	string IPlugin.Description => "Manipulate message so u can prank ppl :o";
	string IPlugin.Version => "0.0.1.0";
	int IPlugin.VersionId => 0x00_00_01_00;
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => 114514_1;

	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;

	void IPlugin.Load(Program program, bool isDynamicLoading)
	{
	}
	void IPlugin.Unload(Program program, bool isDynamicUnloading)
	{
	}
}
