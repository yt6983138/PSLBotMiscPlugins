using Microsoft.AspNetCore.Builder;

namespace LocalizationTool;

public class LocalizationToolPlugin : IPlugin<LocalizationToolPlugin>
{
	public static string Name => "Localization tool";
	public static string Description => "Localization admin commands (csv import/export/key check)";
	public static string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public static int Priority => 114514_2;

	private LocalizationToolPlugin()
	{
	}

	public static Task Load(WebApplicationBuilder hostBuilder)
	{
		return Task.CompletedTask;
	}
	public static Task<LocalizationToolPlugin> Setup(WebApplication host)
	{
		return Task.FromResult(new LocalizationToolPlugin());
	}

	public Task Unload(WebApplication host, bool isSafeUnload)
	{
		return Task.CompletedTask;
	}
}
