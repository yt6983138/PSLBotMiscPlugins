using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;

namespace SaveArchiveProgram;

public class SaveArchiveProgramPlugin : IPlugin
{
	string IPlugin.Name => "Save Archive Program Plugin";
	string IPlugin.Description => "Save archive program for 2026/10/31 global save discontinuation";
	Version IPlugin.Version => new(1, 0, 0, 0);
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => 1000000;

	public void Load(WebApplicationBuilder hostBuilder)
	{
		hostBuilder.Services.AddSingleton<SaveArchiveService>();
	}
	public void ConfigureDiscordClient(WebApplicationBuilder builder, DiscordClientServiceConfig config)
	{
	}
	public void Setup(WebApplication host)
	{
	}
	public void Unload(WebApplication host, bool isSafeUnload)
	{
	}
}
