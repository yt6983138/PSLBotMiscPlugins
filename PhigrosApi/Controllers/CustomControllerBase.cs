using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace PhigrosApi.Controllers;

public enum ErrorCode
{
	RequestError = -1,
	Unspecified = 0,
	LoginProcessNotDone = 1,
	LoginOtherError = 11,
	GetProfileError = 114,
	LCLoginError = 1145,
	DecryptingError = 114514,
	PhigrosTokenError = 1145141,
	PhigrosLibraryInternalError = 11451419,
	ArgumentOutOfRange = 114514191
}
public abstract class CustomControllerBase : Controller
{
	protected static readonly JsonSerializerOptions _jsonSettings = new()
	{
		PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
	};

	public static Dictionary<ErrorCode, HttpStatusCode> ErrorCodeToHttpStatusCode { get; } = new()
	{
		{ ErrorCode.RequestError, HttpStatusCode.BadRequest },
		{ ErrorCode.Unspecified, HttpStatusCode.NotImplemented },
		{ ErrorCode.LoginProcessNotDone, HttpStatusCode.OK },
		{ ErrorCode.LoginOtherError, HttpStatusCode.InternalServerError },
		{ ErrorCode.GetProfileError, HttpStatusCode.InternalServerError },
		{ ErrorCode.LCLoginError, HttpStatusCode.InternalServerError },
		{ ErrorCode.DecryptingError, HttpStatusCode.UnprocessableContent },
		{ ErrorCode.PhigrosTokenError, HttpStatusCode.UnprocessableContent },
		{ ErrorCode.PhigrosLibraryInternalError, HttpStatusCode.InternalServerError },
		{ ErrorCode.ArgumentOutOfRange, HttpStatusCode.UnprocessableContent }
	};

	protected ILogger _logger;

	protected string IP => this.HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress?.ToString() ?? "<unknown_ip>";

	public CustomControllerBase(ILoggerFactory logger)
	{
		this._logger = logger.CreateLogger(this.GetType());
	}

	[NonAction]
	public JsonResult Json(object? data, bool successful, int statusCode = 200, object? options = null)
	{
		return new(new
		{
			Success = successful,
			Data = data
		}, options ?? _jsonSettings)
		{
			StatusCode = statusCode
		};
	}
	[NonAction]
	public override JsonResult Json(object? data)
	{
		return this.Json(data, true);
	}
	[NonAction]
	public override JsonResult Json(object? data, object? options)
	{
		return this.Json(data, true, 200, options);
	}

	[NonAction]
	public async Task<(T Value, IActionResult? Error)> ReadRequestBodyAs<T>()
	{
		T? body;
		try
		{
			body = await this.Request.ReadFromJsonAsync<T>();
		}
		catch (Exception ex)
		{
			return (default!, this.Error(ex.Message, code: ErrorCode.RequestError));
		}
		if (body == null)
		{
			this._logger.LogDebug("{ip} sent empty request.", this.IP);
			return (default!, this.Error("Body is empty", code: ErrorCode.RequestError));
		}
		return (body, default);
	}
	[NonAction]
	public async Task<string> ReadRequestBodyAsString()
	{
		this.Request.EnableBuffering();

		using StreamReader requestReader = new(this.Request.Body, leaveOpen: true);
		string body = await requestReader.ReadToEndAsync();
		this.Request.Body.Seek(0, SeekOrigin.Begin);

		return body;
	}

	[NonAction]
	public JsonResult Error(string message, ErrorCode code = ErrorCode.Unspecified)
	{
		this._logger.LogError("{ip} encountered an error: {message} (Code: {code})", this.IP, message, code);
		var errorResponse = new
		{
			Code = code,
			CodeName = code.ToString(),
			Message = message
		};
		return this.Json(errorResponse, false, (int)ErrorCodeToHttpStatusCode[code]);
	}
	[NonAction]
	public JsonResult Error(Exception ex, ErrorCode code = ErrorCode.Unspecified)
	{
		return this.Error(ex.Message, code);
	}
}
