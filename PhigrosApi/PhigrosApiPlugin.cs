using Microsoft.AspNetCore.Mvc.ApplicationParts;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Services.Phigros;
using PSLDiscordBot.Framework;

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
		this._hasOtherRegisteredMvc = hostBuilder.Services.HasMvcRegistered();

		CommonLoad(hostBuilder, this._hasOtherRegisteredMvc);
	}
	public void Setup(IHost host)
	{
		WebApplication app = host.Unbox<WebApplication>();
		CommonSetup(app, this._hasOtherRegisteredMvc);
	}
	public void Unload(IHost host, bool isDynamicUnloading)
	{
	}

	private static void CommonLoad(WebApplicationBuilder builder, bool hasOtherRegisteredMvc)
	{
		if (!hasOtherRegisteredMvc)
		{
			builder.Services.AddControllers();
		}
		builder.Services.AddCors(options => options.AddPolicy("Everything",
			policy =>
			{
				policy.AllowAnyHeader()
					.AllowAnyMethod()
					.AllowAnyOrigin();
			}));
		builder.Services.AddExceptionHandler<ExceptionHandler>();
		builder.Services.AddProblemDetails();
		builder.Services.GetApplicationPartManager()
			.ApplicationParts.Add(new AssemblyPart(typeof(PhigrosApiPlugin).Assembly));
	}
	private static void CommonSetup(WebApplication app, bool hasOtherRegisteredMvc)
	{
		if (!hasOtherRegisteredMvc)
		{
			app.MapControllers().AllowAnonymous();
			app.UseStaticFiles(new StaticFileOptions()
			{
				ServeUnknownFileTypes = true
			});
			app.UseRouting();
			app.UseAuthorization();
		}

		app.UseExceptionHandler();
		app.UseCors("Everything");
	}

	//#if DEBUG
	public static void Main(string[] args)
	{
		WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

		CommonLoad(builder, false);

		builder.Services.AddSingleton<PhigrosService>();
		builder.Services.AddSingleton<LocalizationService>();

		WebApplication app = builder.Build();

		// Configure the HTTP request pipeline.
		if (!app.Environment.IsDevelopment())
			// app.UseExceptionHandler("/Index");
			// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
			app.UseHsts();

		CommonSetup(app, false);

		app.Run();
	}
	//#endif
}
