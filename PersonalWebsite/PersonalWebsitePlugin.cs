using Microsoft.AspNetCore.Mvc.ApplicationParts;
using PersonalWebsite.Services;
using PSLDiscordBot.Framework;

namespace PersonalWebsite;

public class PersonalWebsitePlugin : IPlugin
{
	private bool _hasOtherRegisteredMvc = false;

	public string Name => "Personal Website";
	public string Description => "My personal website.";
	public Version Version => new(1, 0, 0, 0);
	public string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public int Priority => 10001;
	public bool CanBeDynamicallyLoaded => false;
	public bool CanBeDynamicallyUnloaded => false;

	public void Load(WebApplicationBuilder hostBuilder, bool isDynamicLoading)
	{
		hostBuilder.Services.AddSingleton<BlogManagerService>();
		hostBuilder.Services.Configure<Config>(
			hostBuilder.Configuration.GetSection("PersonalWebsiteConfig"));

		this._hasOtherRegisteredMvc = hostBuilder.Services.HasMvcRegistered();

		if (!this._hasOtherRegisteredMvc)
		{
			hostBuilder.Services.AddControllers();
		}
		hostBuilder.Services.AddRazorPages();
		hostBuilder.Services.GetApplicationPartManager()
			.ApplicationParts.Add(new AssemblyPart(typeof(PersonalWebsitePlugin).Assembly));
	}
	public void Setup(IHost host)
	{
		WebApplication app = host.Unbox<WebApplication>();
		if (!this._hasOtherRegisteredMvc)
		{
			app.MapControllers().AllowAnonymous();
			app.UseStaticFiles(new StaticFileOptions()
			{
				ServeUnknownFileTypes = true
			});
			app.UseRouting();
			app.UseAuthorization();
		}
		app.MapRazorPages().AllowAnonymous();
	}
	public void Unload(IHost host, bool isDynamicUnloading)
	{
	}

#if DEBUG
	// for debug only
	public static void Main(string[] args)
	{
		WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

		PersonalWebsitePlugin self = new();

		// Add services to the container.
		self.Load(builder, false);

		WebApplication app = builder.Build();

		// Configure the HTTP request pipeline.
		if (!app.Environment.IsDevelopment())
		{
			app.UseExceptionHandler("/Home/Error");
		}
		self.Setup(app);

		app.Run();
	}
#endif
}
