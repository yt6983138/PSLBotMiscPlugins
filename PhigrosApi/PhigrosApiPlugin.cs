using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;

namespace PhigrosApi;

public class PhigrosApiPlugin : IPlugin
{
	public const string GroupName = "PhigrosApi";

	public string Name => "Phigros Api Host";
	public string Description => "A plugin wrapper for the wrapper of PhigrosLibraryCSharp";
	public Version Version => new(1, 0, 0, 0);
	public string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public int Priority => 10086;

	public void Load(WebApplicationBuilder hostBuilder)
	{
		CommonLoad(hostBuilder);
	}
	public void ConfigureDiscordClient(WebApplicationBuilder builder, DiscordClientServiceConfig config) { }
	public void Setup(WebApplication host)
	{
		IMvcConfigurationService configurator = host.Services.GetRequiredService<IMvcConfigurationService>();

		configurator.StaticFileOptions.ServeUnknownFileTypes = true;
		configurator.BeforeRoutingMiddleware.Add(app => app.UseExceptionHandler());
		configurator.BetweenRoutingAndAuthMiddleware.Add(app => app.UseCors("Everything"));
		configurator.AfterAuthMiddleware.Add(app => app.UseSwagger());
	}
	public void Unload(WebApplication host, bool isSafeUnload)
	{
	}

	private static void CommonLoad(WebApplicationBuilder builder)
	{
		builder.Services.AddExceptionHandler<ExceptionHandler>();
		builder.Services.AddProblemDetails();
		builder.Services.AddAssemblyToMvc<PhigrosApiPlugin>();

		builder.Services.Configure<CorsOptions>(options => options.AddPolicy("Everything",
			policy =>
			{
				policy.AllowAnyHeader()
					.AllowAnyMethod()
					.AllowAnyOrigin();
			}));
		builder.Services.Configure<MvcOptions>(x =>
		{
			x.InputFormatters.Add(new PlainTextFormatter());
			x.InputFormatters.Insert(0, new NoReadInputFormatter());
		});
		Program.Instance.SwaggerGenFilter.Add(Utils.SwaggerRequireInTypeAssembly<PhigrosApiPlugin>);
		Program.Instance.SwaggerConfigurators += (_, config) =>
		{
			config.EnableAnnotations();
			config.SwaggerDoc(GroupName, new()
			{
				Title = GroupName,
				Description = "Phigros Api, a plugin wrapper for the wrapper of PhigrosLibraryCSharp",
				Version = "v1"
			});
		};
	}

	//#if DEBUG
	public static void Main(string[] args)
	{
		WebApplicationBuilder builder = WebApplication.CreateBuilder(args);


		builder.Services.AddMvc();
		CommonLoad(builder);
#if DEBUG
		Program.Instance.ConfigureSwagger(builder);
#endif

		builder.Services.AddSingleton<PhigrosService>();
		builder.Services.AddSingleton<LocalizationService>();

		WebApplication app = builder.Build();

		// Configure the HTTP request pipeline.
		if (!app.Environment.IsDevelopment())
		{
			// app.UseExceptionHandler("/Index");
			// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
			app.UseHsts();
		}
		app.MapControllers().AllowAnonymous();
		app.UseStaticFiles(new StaticFileOptions()
		{
			ServeUnknownFileTypes = true
		});
		app.UseRouting();
		app.UseAuthorization();
		app.UseExceptionHandler();
		app.UseCors("Everything");
		app.UseSwagger();
		app.UseSwaggerUI(options =>
		{
			options.SwaggerEndpoint($"/swagger/{GroupName}/swagger.json", GroupName);
		});

		app.Run();
	}
	//#endif
}
