using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace PersonalWebsite.Controllers;

public abstract class CustomControllerBase : Controller
{
	protected static readonly JsonSerializerOptions _jsonSettings = new()
	{
		PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
	};

	[NonAction]
	public override JsonResult Json(object? data)
	{
		return this.Json(data, _jsonSettings);
	}
	[NonAction]
	public override JsonResult Json(object? data, object? options)
	{
		return base.Json(data, options ?? _jsonSettings);
	}

}
