using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Diagnostics.CodeAnalysis;

namespace AdminHelper.Controllers;

public abstract class AdminControllerBase : Controller
{
	protected AdminConfig AdminConfig { get; }

	protected AdminControllerBase(IOptions<AdminConfig> adminConfig)
	{
		this.AdminConfig = adminConfig.Value;
	}

	protected bool HasBadAuth([NotNullWhen(true)] out IActionResult? error)
	{
		if (!this.Request.Headers.TryGetValue("Authorization", out Microsoft.Extensions.Primitives.StringValues authHeader)
			|| authHeader != this.AdminConfig.MvcSuperSecretNumber.ToString())
		{
			error = this.Unauthorized("Invalid or missing authorization header.");
			return true;
		}
		error = null;
		return false;
	}
}
