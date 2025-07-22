using Microsoft.AspNetCore.Diagnostics;
using PhigrosApi.Controllers;

namespace PhigrosApi;

public class ExceptionHandler : IExceptionHandler
{
	private readonly ILogger<ExceptionHandler> _logger;

	public ExceptionHandler(ILogger<ExceptionHandler> logger)
	{
		this._logger = logger;
	}

	public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
	{
		if (!httpContext.Request.Path.StartsWithSegments("/phiApi"))
		{
			return false;
		}

		httpContext.Response.StatusCode = 500; // Internal Server Error
		httpContext.Response.ContentType = "application/json";
		var errorResponse = new
		{
			Success = false,
			Data = new
			{
				Code = (int)ErrorCode.Unspecified,
				CodeName = ErrorCode.Unspecified.ToString(),
				Message = $"Internal server error: {exception.Message}"
			}
		};
		this._logger.LogError(exception, "Error when handling Phigros api: {url}", httpContext.Request.Path);
		await httpContext.Response.WriteAsJsonAsync(errorResponse, cancellationToken);
		return true;
	}
}
