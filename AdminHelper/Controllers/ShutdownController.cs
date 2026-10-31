using AdminHelper.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AdminHelper.Controllers;

public class ShutdownController : AdminControllerBase
{
	private readonly ShutdownService _shutdownService;
	private readonly ILogger<ShutdownController> _logger;

	public ShutdownController(ShutdownService shutdownService, IOptions<AdminConfig> adminConfig, ILogger<ShutdownController> logger)
		: base(adminConfig)
	{
		this._shutdownService = shutdownService;
		this._logger = logger;
	}

	[HttpPost("/admin/api/shutdown")]
	public IActionResult Shutdown()
	{
		if (this.HasBadAuth(out IActionResult? error)) return error;

		if (this._shutdownService.IsShuttingDown)
			return this.Conflict("Shutdown is already in progress.");

		this._logger.LogInformation("Soft shutdown requested over HTTP.");
		// not awaited on purpose: it can take long; nothing from dispatch is registered in RunningTasks for us, hence 0
		_ = Task.Run(async () =>
		{
			try
			{
				await this._shutdownService.RunAsync(0);
			}
			catch (Exception ex)
			{
				this._logger.LogError(ex, "HTTP-triggered shutdown failed.");
			}
		});

		return this.Accepted();
	}
}
