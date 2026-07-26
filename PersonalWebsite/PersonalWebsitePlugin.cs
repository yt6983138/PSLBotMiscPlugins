using PersonalWebsite.Services;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.Utilities;

namespace PersonalWebsite;

public class PersonalWebsitePlugin : IPlugin
{
	public string Name => "Personal Website";
	public string Description => "My personal website.";
	public Version Version => new(1, 0, 0, 0);
	public string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public int Priority => 10001;

	public void Load(WebApplicationBuilder hostBuilder)
	{
		hostBuilder.Services.AddSingleton<BlogManagerService>();
		hostBuilder.Services.Configure<Config>(
			hostBuilder.Configuration.GetSection("PersonalWebsiteConfig"));

		hostBuilder.Services.AddAssemblyToMvc(this);
	}
	public void ConfigureDiscordClient(WebApplicationBuilder builder, DiscordClientServiceConfig config) { }
	public void Setup(WebApplication host)
	{
		host.Services.GetRequiredService<IMvcConfigurationService>().StaticFileOptions.ServeUnknownFileTypes = true;
	}
	public void Unload(WebApplication host, bool isSafeUnload)
	{
	}
}
