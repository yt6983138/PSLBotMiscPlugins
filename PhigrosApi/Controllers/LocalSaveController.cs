using Microsoft.AspNetCore.Mvc;
using PhigrosLibraryCSharp;

namespace PhigrosApi.Controllers;
public class LocalSaveController : CustomControllerBase
{
	public LocalSaveController(ILoggerFactory logger) : base(logger) { }

	[HttpPost]
	[Route("phiApi/[controller]/DecryptNew")]
	public async Task<IActionResult> DecryptNew()
	{
		string data = await this.ReadRequestBodyAsString();

		string decrypted;
		try
		{
			decrypted = LocalSave.DecryptLocalSaveStringNew(System.Net.WebUtility.UrlDecode(data));
		}
		catch
		{
			return this.Error("Failed to decrypt data", ErrorCode.DecryptingError);
		}

		this._logger.LogDebug("{ip} decrypted {from} to {to}", this.IP, data, decrypted);
		return this.Content(decrypted);
	}
}
