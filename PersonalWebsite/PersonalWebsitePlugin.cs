using PersonalWebsite.Services;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;

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

	// for debug only
	public static void Main(string[] args)
	{
		WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

		PersonalWebsitePlugin self = new();

		// Add services to the container.
		self.Load(builder);
		builder.Services.AddMvc();

		builder.Services.AddRazorPages();
#if DEBUG
		PhigrosApiPlugin phiApi = new();
		phiApi.Load(builder, false);

		builder.Services.AddSingleton<PhigrosService>();
		builder.Services.AddSingleton<LocalizationService>();
		Program.Instance.ConfigureSwagger(builder);
#endif

		WebApplication app = builder.Build();

		// Configure the HTTP request pipeline.
		if (!app.Environment.IsDevelopment())
		{
			app.UseExceptionHandler("/Home/Error");
		}
		app.MapControllers().AllowAnonymous();
		app.UseStaticFiles(new StaticFileOptions()
		{
			ServeUnknownFileTypes = true
		});
		app.UseRouting();
		app.UseAuthorization();
		app.MapRazorPages().AllowAnonymous();

		self.Setup(app);
#if DEBUG
		phiApi.Setup(app);
#endif

		app.Run();
	}
}
