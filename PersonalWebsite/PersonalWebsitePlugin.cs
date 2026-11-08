using PersonalWebsite.Services;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.Utilities;

namespace PersonalWebsite;

public class PersonalWebsitePlugin : IPlugin<PersonalWebsitePlugin>
{
	public static string Name => "Personal Website";
	public static string Description => "My personal website.";
	public static string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public static int Priority => 10001;

	public static Task Load(WebApplicationBuilder hostBuilder)
	{
		hostBuilder.Services.AddSingleton<BlogManagerService>();
		hostBuilder.Services.Configure<Config>(
			hostBuilder.Configuration.GetSection("PersonalWebsiteConfig"));

		hostBuilder.Services.AddAssemblyToMvc<PersonalWebsitePlugin>();
		return Task.CompletedTask;
	}
	public static Task<PersonalWebsitePlugin> Setup(WebApplication host)
	{
		host.Services.GetRequiredService<IMvcConfigurationService>().StaticFileOptions.ServeUnknownFileTypes = true;
		return Task.FromResult(new PersonalWebsitePlugin());
	}
	public Task Unload(WebApplication host, bool isSafeUnload)
	{
		return Task.CompletedTask;
	}
}
