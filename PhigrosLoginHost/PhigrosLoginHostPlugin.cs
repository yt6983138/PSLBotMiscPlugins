using Microsoft.AspNetCore.Mvc.ApplicationParts;
using PSLDiscordBot.Framework;
using System.Text.Json;

namespace PhigrosLoginHost;

public class PhigrosLoginHostPlugin : IPlugin
{
	private bool _hasOtherRegisteredMvc = false;

	public string Name => "Phigros Login Host";
	public string Description => "Login host for people who cannot install TapTap China.";
	public Version Version => new(1, 0, 0, 0);
	public string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public int Priority => 10000;
	public bool CanBeDynamicallyLoaded => false;
	public bool CanBeDynamicallyUnloaded => false;

	public void Load(WebApplicationBuilder hostBuilder, bool isDynamicLoading)
	{
		hostBuilder.Services.AddSingleton<HttpClientService>();
		hostBuilder.Services.Configure<LoginHostConfig>(
			hostBuilder.Configuration.GetSection("LoginHostConfig"));

		this._hasOtherRegisteredMvc = hostBuilder.Services.HasMvcRegistered();

		if (!this._hasOtherRegisteredMvc)
		{
			hostBuilder.Services.AddControllers()
				.AddJsonOptions(x => x.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower);
		}
		hostBuilder.Services.GetApplicationPartManager()
			.ApplicationParts.Add(new AssemblyPart(typeof(PhigrosLoginHostPlugin).Assembly));
	}
	public void Setup(IHost host)
	{
		if (!this._hasOtherRegisteredMvc)
		{
			WebApplication app = host.Unbox<WebApplication>();
			app.MapControllers().AllowAnonymous();
			app.UseStaticFiles(new StaticFileOptions()
			{
				ServeUnknownFileTypes = true
			});
			app.UseRouting();
			app.UseAuthorization();
		}
	}
	public void Unload(IHost host, bool isDynamicUnloading)
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
