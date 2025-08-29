using Microsoft.AspNetCore.Mvc;
using PhigrosLibraryCSharp;
using System.Net.Mime;

namespace PhigrosApi.Controllers;
public class LocalSaveController : CustomControllerBase
{
	public LocalSaveController(ILoggerFactory logger) : base(logger) { }

	[HttpPost]
	[Route("phiApi/[controller]/DecryptNew")]
	[ProducesResponseType<string>(StatusCodes.Status200OK)]
	[ProducesErrorResponseType(typeof(Response<ErrorData>))]
	[Consumes(MediaTypeNames.Text.Plain)]
	public IActionResult DecryptNew([FromBody] string data)
	{
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
