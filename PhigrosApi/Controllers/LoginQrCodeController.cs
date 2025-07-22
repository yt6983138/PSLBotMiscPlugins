using Microsoft.AspNetCore.Mvc;
using PhigrosLibraryCSharp.Cloud.Login;

namespace PhigrosApi.Controllers;

[ApiController]
public class LoginQrCodeController : CustomControllerBase
{
	public LoginQrCodeController(ILoggerFactory logger) : base(logger) { }

	[HttpGet]
	[Route("phiApi/[controller]/GetNewQRCode")]
	public async Task<IActionResult> GetNewQRCode(bool useChinaEndpoint)
	{
		CompleteQRCodeData qrcode = await TapTapHelper.RequestLoginQrCode(useChinaEndpoint: useChinaEndpoint);
		this._logger.LogDebug("{ip} requested a login QrCode. Url: {url}", this.IP, qrcode.Url);

		return this.Json(qrcode);
	}

	[HttpGet]
	[Route("phiApi/[controller]/CheckQRCode")]
	public async Task<IActionResult> CheckQRCode(bool useChinaEndpoint)
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

	[HttpGet]
	[Route("phiApi/[controller]/GetTapTapProfile")]
	public async Task<IActionResult> GetTapTapProfile(bool useChinaEndpoint)
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

	[HttpGet]
	[Route("phiApi/[controller]/GetPhigrosToken")]
	public async Task<IActionResult> GetPhigrosToken(bool useChinaEndpoint)
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
		this._logger.LogDebug("{ip} got token successfully. Token: {token}", this.IP, token);
		return this.Json(token);
	}
}
