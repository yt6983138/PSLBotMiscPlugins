using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.Utilities;
using System.Text.Json;

namespace PhigrosLoginHost;

public class PhigrosLoginHostPlugin : IPlugin<PhigrosLoginHostPlugin>
{
	public static string Name => "Phigros Login Host";
	public static string Description => "Login host for people who cannot install TapTap China.";
	public static string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public static int Priority => 10000;

	public static Task Load(WebApplicationBuilder hostBuilder)
	{
		hostBuilder.Services.AddSingleton<HttpClientService>();
		hostBuilder.Services.Configure<LoginHostConfig>(
			hostBuilder.Configuration.GetSection("LoginHostConfig"));
		hostBuilder.Services.AddAssemblyToMvc<PhigrosLoginHostPlugin>();
		return Task.CompletedTask;
	}
	public static Task<PhigrosLoginHostPlugin> Setup(WebApplication host)
	{
		host.Services.GetRequiredService<IMvcConfigurationService>().StaticFileOptions.ServeUnknownFileTypes = true;
		return Task.FromResult(new PhigrosLoginHostPlugin());
	}
	public Task Unload(WebApplication host, bool isSafeUnload)
	{
		return Task.CompletedTask;
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
