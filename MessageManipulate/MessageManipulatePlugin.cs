using PSLDiscordBot.Framework;

namespace MessageManipulate;

public class MessageManipulatePlugin : IPlugin
{
	string IPlugin.Name => "Message manipulate";
	string IPlugin.Description => "Manipulate message so u can prank ppl :o";
	Version IPlugin.Version => new(1, 0, 0, 0);
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
