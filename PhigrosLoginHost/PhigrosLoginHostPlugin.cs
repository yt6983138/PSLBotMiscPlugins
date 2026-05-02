using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using System.Text.Json;

namespace PhigrosLoginHost;

public class PhigrosLoginHostPlugin : IPlugin
{
	public string Name => "Phigros Login Host";
	public string Description => "Login host for people who cannot install TapTap China.";
	public Version Version => new(1, 0, 0, 0);
	public string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public int Priority => 10000;

	public void Load(WebApplicationBuilder hostBuilder)
	{
		hostBuilder.Services.AddSingleton<HttpClientService>();
		hostBuilder.Services.Configure<LoginHostConfig>(
			hostBuilder.Configuration.GetSection("LoginHostConfig"));
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

		// Add services to the container.
		builder.Services.AddSingleton<HttpClientService>();
		builder.Services.Configure<LoginHostConfig>(
			builder.Configuration.GetSection("Configuration"));

		builder.Services.AddControllersWithViews()
			.AddJsonOptions(x => x.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower);

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

		app.Run();
	}
}
