using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.BuiltInServices;
using PSLDiscordBot.Framework.Utilities;

namespace PhigrosApi;

public class PhigrosApiPlugin : IPlugin<PhigrosApiPlugin>
{
	public const string GroupName = "PhigrosApi";

	public static string Name => "Phigros Api Host";
	public static string Description => "A plugin wrapper for the wrapper of PhigrosLibraryCSharp";
	public static string Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	public static int Priority => 10086;

	public static Task Load(WebApplicationBuilder hostBuilder)
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

		// to remind myself, the openapi spec url is /openapi/PhigrosApi.json so i don't spend 5 hours looking for it again

		hostBuilder.Services.AddOpenApi(GroupName, options =>
		{
			options.ShouldInclude = WebUtility.OpenAPIRequireInTypeAssembly<PhigrosApiPlugin>;
			options.AddSchemaTransformer<NoReadSchemaTransformer>();
		});
		return Task.CompletedTask;
	}

	public static Task<PhigrosApiPlugin> Setup(WebApplication host)
	{
		IMvcConfigurationService configurator = host.Services.GetRequiredService<IMvcConfigurationService>();

		configurator.StaticFileOptions.ServeUnknownFileTypes = true;
		configurator.BeforeRoutingMiddleware.Add(app => app.UseExceptionHandler());
		configurator.BetweenRoutingAndAuthMiddleware.Add(app => app.UseCors("Everything"));
		configurator.AfterAuthMiddleware.Add(app =>
		{
			app.MapOpenApi();
		});
		return Task.FromResult(new PhigrosApiPlugin());
	}

	public Task Unload(WebApplication host, bool isSafeUnload)
	{
		return Task.CompletedTask;
	}
}
