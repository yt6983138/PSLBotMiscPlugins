using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using PSLDiscordBot.Framework;

namespace SaveArchiveProgram;

public class SaveArchiveProgramPlugin : IPlugin<SaveArchiveProgramPlugin>
{
	public static string Name => "Save Archive Program Plugin";
	public static string Description => "Save archive program for 2026/10/31 global save discontinuation";
	public static string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public static int Priority => 1000000;

	public static Task Load(WebApplicationBuilder hostBuilder)
	{
		hostBuilder.Services.AddSingleton<SaveArchiveService>();
		return Task.CompletedTask;
	}
	public static Task<SaveArchiveProgramPlugin> Setup(WebApplication host)
	{
		return Task.FromResult(new SaveArchiveProgramPlugin());
	}
	public Task Unload(WebApplication host, bool isSafeUnload)
	{
		return Task.CompletedTask;
	}
}
