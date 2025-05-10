using Microsoft.AspNetCore.Mvc;
using PhigrosLibraryCSharp;

namespace PhigrosApi.Controllers;
public class LocalSaveController : Controller
{
	private ILogger<LocalSaveController> _logger;

	public LocalSaveController(ILogger<LocalSaveController> logger)
	{
		this._logger = logger;
	}

	[HttpPost]
	[Route("phiApi/[controller]/DecryptNew")]
	public async Task<IActionResult> DecryptNew()
	{
		string data = await this.Request.ReadBodyAsString();

		string decrypted;
		try
		{
			decrypted = Save.DecryptLocalSaveStringNew(System.Net.WebUtility.UrlDecode(data));
		}
		catch (Exception ex)
		{
			return this.Error(this._logger, ex.Message, "Failed to decrypt data", ErrorCode.DecryptingError);
		}

		this._logger.LogDebug("{ip} decrypted {from} to {to}", this.HttpContext.GetIP(), data, decrypted);
		return this.Content(decrypted);
	}
}
