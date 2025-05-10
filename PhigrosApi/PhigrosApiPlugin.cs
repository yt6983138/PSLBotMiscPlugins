using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using PSLDiscordBot.Framework;
using System.Text.Json;

namespace PhigrosApi;

public class PhigrosApiPlugin : IPlugin
{
	private bool _hasOtherRegisteredMvc = false;

	public string Name => "Phigros Api Host";
	public string Description => "A plugin wrapper for the wrapper of PhigrosLibraryCSharp";
	public Version Version => new(1, 0, 0, 0);
	public string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public int Priority => 10086;
	public bool CanBeDynamicallyLoaded => false;
	public bool CanBeDynamicallyUnloaded => false;

	public void Load(WebApplicationBuilder hostBuilder, bool isDynamicLoading)
	{
		this._hasOtherRegisteredMvc = hostBuilder.Services.Any(x => x.ServiceType == typeof(IMvcBuilder));
		this._hasOtherRegisteredCors = hostBuilder.Services.Any(x => x.ServiceType == typeof(ICorsPolicyProvider));

		if (!this._hasOtherRegisteredMvc)
		{
			hostBuilder.Services.AddControllers()
				.AddJsonOptions(x => x.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower);
		}
		hostBuilder.Services.AddCors(options => options.AddPolicy("Everything",
			policy =>
			{
				policy.AllowAnyHeader()
					.AllowAnyMethod()
					.AllowAnyOrigin();
			}));
		hostBuilder.Services.GetApplicationPartManager()
			.ApplicationParts.Add(new AssemblyPart(typeof(PhigrosApiPlugin).Assembly));
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

		app.UseCors("Everything");
	}
	public void Unload(IHost host, bool isDynamicUnloading)
	{
	}

#if DEBUG
	public static void Main(string[] args)
	{
		WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

		// Add services to the container.
		builder.Services.AddCors(options => options.AddPolicy("Everything",
			policy =>
			{
				policy.AllowAnyHeader()
					.AllowAnyMethod()
					.AllowAnyOrigin();
			}));

		builder.Services.AddControllersWithViews();

		builder.Services.Configure<PhigrosApiConfig>(
			builder.Configuration.GetSection("PhigrosDataConfig"));

		builder.Services.AddSingleton<PhigrosData>();

		WebApplication app = builder.Build();

		// Configure the HTTP request pipeline.
		if (!app.Environment.IsDevelopment())
			// app.UseExceptionHandler("/Index");
			// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
			app.UseHsts();
		app.MapControllers().AllowAnonymous();

		//app.UseHttpsRedirection();
		app.UseStaticFiles(new StaticFileOptions()
		{
			ServeUnknownFileTypes = true
		});

		app.UseRouting();

		app.UseCors("Everything");

		app.UseAuthorization();

		//app.MapControllerRoute(
		//	name: "default",
		//	pattern: "{controller=Home}/{action=GetNewQrcode}");

		app.Run();
	}
#endif
}
