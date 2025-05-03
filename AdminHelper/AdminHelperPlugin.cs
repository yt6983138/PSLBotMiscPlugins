using AdminHelper.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PSLDiscordBot.Framework;

namespace AdminHelper;

public class AdminHelperPlugin : IPlugin
{
	string IPlugin.Name => "Admin helper";
	string IPlugin.Description => "Help admins do shit";
	Version IPlugin.Version => new(1, 1, 0, 0);
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => 114514_1;

	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;

	void IPlugin.Load(WebApplicationBuilder hostBuilder, bool isDynamicLoading)
	{
		hostBuilder.Services.Configure<AdminConfig>(
			hostBuilder.Configuration.GetSection("AdminConfig"));
		hostBuilder.Services.AddSingleton<BlackListService>();
	}

	void IPlugin.Setup(IHost host)
	{
	}

	void IPlugin.Unload(IHost host, bool isDynamicUnloading)
	{
	}
}
