using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Services.Phigros;
using PSLDiscordBot.Framework;

namespace PhigrosApi;

public class PhigrosApiPlugin : IPlugin
{
	private bool _hasOtherRegisteredMvc = false;

	public const string GroupName = "PhigrosApi";

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
		app.UseSwagger();
	}

	//#if DEBUG
	public static void Main(string[] args)
	{
		WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

		CommonLoad(builder, false);
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

		CommonSetup(app, false);
		app.UseSwaggerUI(options =>
		{
			options.SwaggerEndpoint($"/swagger/{GroupName}/swagger.json", GroupName);
		});

		app.Run();
	}
	//#endif
}
