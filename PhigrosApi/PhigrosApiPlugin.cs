using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.Utilities;

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
		hostBuilder.Services.AddExceptionHandler<ExceptionHandler>();
		hostBuilder.Services.AddProblemDetails();
		hostBuilder.Services.AddAssemblyToMvc<PhigrosApiPlugin>();

		hostBuilder.Services.Configure<CorsOptions>(options => options.AddPolicy("Everything",
			policy =>
			{
				policy.AllowAnyHeader()
					.AllowAnyMethod()
					.AllowAnyOrigin();
			}));
		hostBuilder.Services.Configure<MvcOptions>(x =>
		{
			x.InputFormatters.Add(new PlainTextFormatter());
			x.InputFormatters.Insert(0, new NoReadInputFormatter());
		});

		// okay, so i made sure swagger works after upgrading to .net 10, but the some NoRead<> content seems to be wrong
		// also to remind myself, the swagger spec url is /swagger/PhigrosApi/swagger.json so i don't spend 5 hours looking for it again

		// also the original plan is to regenerate the PhigrosApi.Client.Javascript, because it has broken jsdoc and a bunch of other stuff
		// but i already got enough within the url looking process, so fuck it
		Program.Instance.SwaggerGenFilter.Add(WebUtility.SwaggerRequireInTypeAssembly<PhigrosApiPlugin>);
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

	public void ConfigureDiscordClient(WebApplicationBuilder builder, DiscordClientServiceConfig config) { }

	public void Setup(WebApplication host)
	{
		IMvcConfigurationService configurator = host.Services.GetRequiredService<IMvcConfigurationService>();

		configurator.StaticFileOptions.ServeUnknownFileTypes = true;
		configurator.BeforeRoutingMiddleware.Add(app => app.UseExceptionHandler());
		configurator.BetweenRoutingAndAuthMiddleware.Add(app => app.UseCors("Everything"));
		configurator.AfterAuthMiddleware.Add(app =>
		{
			app.UseSwagger();
#if DEBUG
			app.UseSwaggerUI();
#endif
		});
	}

	public void Unload(WebApplication host, bool isSafeUnload)
	{
	}
}
