using Microsoft.AspNetCore.Mvc;
using PhigrosLibraryCSharp.CloudSave.Login;
using System.Runtime.CompilerServices;

namespace PhigrosApi.Controllers;

[Controller]
[ApiExplorerSettings(GroupName = PhigrosApiPlugin.GroupName)]
public class LoginQrCodeController : CustomControllerBase
{
	public LoginQrCodeController(ILoggerFactory logger) : base(logger) { }

	[HttpGet]
	[Route("phiApi/[controller]/GetNewQRCode")]
	[ProducesResponseType<Response<CompleteQRCodeData>>(StatusCodes.Status200OK)]
	//[ProducesErrorResponseType(typeof(Response<ErrorData>))]
	public async Task<IActionResult> GetNewQRCode(bool useChinaEndpoint)
	{
		CompleteQRCodeData qrcode = await TapTapHelper.RequestLoginQrCode(useChinaEndpoint: useChinaEndpoint);
		this._logger.LogDebug("{ip} requested a login QrCode. Url: {url}", this.IP, qrcode.Url);

		// for some reason they now respond with interval of 1 (it was 3), and if clients check the qrcode at the interval of 1
		// they would be responded with client checking too frequently
		if (qrcode.Interval < 3)
			SetQRCodeInterval(qrcode, 3);

		return this.Json(qrcode);

		[UnsafeAccessor(UnsafeAccessorKind.Method, Name = "set_Interval")]
		static extern void SetQRCodeInterval(CompleteQRCodeData self, int interval);
	}

	[HttpPost]
	[Route("phiApi/[controller]/CheckQRCode")]
	[ProducesResponseType<Response<TapTapTokenData>>(StatusCodes.Status200OK)]
	[ProducesErrorResponseType(typeof(Response<ErrorData>))]
	public async Task<IActionResult> CheckQRCode(bool useChinaEndpoint, [FromBody] NoRead<CompleteQRCodeData> _body) // im leaving _body here to make swagger generate the correct schema (im lazy to change code)
	{
		(CompleteQRCodeData? result, IActionResult? error) = await this.ReadRequestBodyAs<CompleteQRCodeData>();
		if (error is not null)
			return error;

		TapTapTokenData? token;
		try
		{
			token = await TapTapHelper.CheckQRCodeResult(result, useChinaEndpoint);
		}
		catch (Exception ex)
		{
			return this.Error(ex, code: ErrorCode.LoginOtherError);
		}
		if (token is null)
			return this.Error("Login progress not done", code: ErrorCode.LoginProcessNotDone);

		this._logger.LogDebug("{ip} checked successfully.", this.IP);
		return this.Json(token);
	}

	[HttpPost]
	[Route("phiApi/[controller]/GetTapTapProfile")]
	[ProducesResponseType<Response<TapTapProfileData>>(StatusCodes.Status200OK)]
	[ProducesErrorResponseType(typeof(Response<ErrorData>))]
	public async Task<IActionResult> GetTapTapProfile(bool useChinaEndpoint, [FromBody] NoRead<TapTapTokenData> _)
	{
		(TapTapTokenData result, IActionResult? error) = await this.ReadRequestBodyAs<TapTapTokenData>();
		if (error is not null)
			return error;

		TapTapProfileData? profile;
		try
		{
			profile = await TapTapHelper.GetProfile(result.Data, useChinaEndpoint: useChinaEndpoint);
		}
		catch (Exception ex)
		{
			return this.Error(ex, code: ErrorCode.GetProfileError);
		}
		this._logger.LogDebug("{ip} got profile successfully.", this.IP);
		return this.Json(profile);
	}

	[HttpPost]
	[Route("phiApi/[controller]/GetPhigrosToken")]
	[ProducesResponseType<Response<string>>(StatusCodes.Status200OK)]
	[ProducesErrorResponseType(typeof(Response<ErrorData>))]
	public async Task<IActionResult> GetPhigrosToken(bool useChinaEndpoint, [FromBody] NoRead<TapTapTokenData> _)
	{
		(TapTapTokenData result, IActionResult? error) = await this.ReadRequestBodyAs<TapTapTokenData>();
		if (error is not null)
			return error;

		TapTapProfileData profile;
		try
		{
			profile = await TapTapHelper.GetProfile(result.Data, useChinaEndpoint: useChinaEndpoint);
		}
		catch (Exception ex)
		{
			return this.Error(ex, code: ErrorCode.GetProfileError);
		}
		string token;
		try
		{
			token = await LCHelper.LoginAndGetToken(new(profile.Data, result.Data), useChinaEndpoint);
		}
		catch (Exception ex)
		{
			return this.Error(ex, code: ErrorCode.LCLoginError);
		}
		this._logger.LogDebug("{ip} got token successfully.", this.IP);
		return this.Json(token);
	}
}
