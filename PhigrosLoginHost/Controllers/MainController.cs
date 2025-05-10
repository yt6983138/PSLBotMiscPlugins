using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using System.Text;
using System.Text.Json.Nodes;
using System.Text.RegularExpressions;

namespace PhigrosLoginHost.Controllers;

public partial class MainController : Controller
{
	public const string TaptapAccountHost = "accounts.taptap.cn";

	public static long NowTaptapTimeValue => (long)(DateTime.UtcNow - DateTime.UnixEpoch).TotalSeconds;

	private readonly LoginHostConfig _config;
	private readonly ILogger<MainController> _logger;
	private readonly HttpClientService _httpService;

	public MainController(ILogger<MainController> logger, HttpClientService httpService, IOptions<LoginHostConfig> config)
	{
		this._logger = logger;
		this._httpService = httpService;
		this._config = config.Value;
	}

	[GeneratedRegex("Domain=(.*?);")]
	private static partial Regex SetCookieDomainRegex();
	private static object MakeTapTapResponse(object data, bool successful = true)
	{
		return new
		{
			Data = data,
			Now = NowTaptapTimeValue,
			Successful = successful
		};
	}

	private async Task<HttpResponseMessage> ProxyTo(string domain, bool handleTheRest = true, HttpClient? customClient = null)
	{
		HttpClient client = customClient ?? this._httpService.Client;
		UriBuilder targetUri = new(this.Request.GetEncodedUrl())
		{
			Host = domain,
			Scheme = "https",
			Port = 443
		};
		HttpRequestMessage request = new(HttpMethod.Parse(this.Request.Method), targetUri.Uri)
		{
			Content = new CustomStreamContent(this.Request.Body, this.Request.Headers.ContentType.FirstOrDefault())
		};

		request.Headers.Clear();
		foreach (KeyValuePair<string, StringValues> item in this.Request.Headers)
			request.Headers.TryAddWithoutValidation(item.Key, (IEnumerable<string>)item.Value);
		request.Headers.Referrer = targetUri.Uri;
		request.Headers.Host = targetUri.Host;

		HttpResponseMessage response = await client.SendAsync(request);

		this.Response.Headers.Clear();
		foreach (KeyValuePair<string, IEnumerable<string>> item in response.Headers)
			this.Response.Headers.Append(item.Key, new(item.Value.ToArray()));
		foreach (KeyValuePair<string, IEnumerable<string>> item in response.Content.Headers)
			this.Response.Headers.Append(item.Key, new(item.Value.ToArray()));
		this.Response.Headers.TransferEncoding = StringValues.Empty; // why
		this.Response.Headers.SetCookie = new(this.Response.Headers.SetCookie
			.Select(x => x is null ? null : SetCookieDomainRegex().Replace(x, $"Domain={this._config.Host};"))
			.ToArray());

		this.Response.StatusCode = (int)response.StatusCode;

		if (handleTheRest)
		{
			using Stream stream = response.Content.ReadAsStream();
			await stream.CopyToAsync(this.Response.Body);
			await this.Response.StartAsync();
		}

		this._logger.LogDebug("Proxied {original} to {target}, autoStart = {autoStart}", this.Request.GetEncodedUrl(), targetUri.ToString(), handleTheRest);

		return response;
	}
	private async Task ProxyAndModify(string domain, Func<string, string> processor)
	{

		HttpResponseMessage response = await this.ProxyTo(domain, false, this._httpService.AutoDecompressClient);

		try
		{
			string modified = processor.Invoke(await response.Content.ReadAsStringAsync());

			byte[] buffer = Encoding.UTF8.GetBytes(modified);

			this.Response.Headers.ContentLength = buffer.Length;
			this.Response.Headers.ContentEncoding = StringValues.Empty;

			await this.Response.Body.WriteAsync(buffer);
		}
		catch (Exception e)
		{
			this._logger.LogDebug("exception during modification {e}", e);
		}

		await this.Response.StartAsync();
	}
	public async Task ProxyAndModifyJson(string domain, Action<JsonNode> processor)
	{
		await this.ProxyAndModify(domain, (input) =>
		{
			JsonNode? obj = JsonObject.Parse(input);
			if (obj is null) return input;
			processor.Invoke(obj);
			return obj.ToJsonString();
		});
	}
	public async Task ProxyAndModifyJsonSubData(string domain, Action<JsonNode> processor)
	{
		await this.ProxyAndModifyJson(domain, node =>
		{
			JsonNode? data = node["data"];
			if (data is not null) processor.Invoke(data);
		});
	}
	private RedirectResult RedirectPreserveQueries(string url)
	{
		Uri origin = new(this.Request.GetEncodedUrl());
		UriBuilder target = new()
		{
			Host = this._config.Host,
			Port = this._config.Port,
			Scheme = this._config.Scheme,
			Query = origin.Query,
			Path = url
		};

		return this.Redirect(target.Uri.ToString());
	}
	private static async Task<JsonNode> LoadFromFileAndModifyTime(string path)
	{
		using FileStream stream = new(path, FileMode.Open, FileAccess.Read);
		JsonNode json = await JsonNode.ParseAsync(stream)
			?? throw new ArgumentException("no valid json", nameof(path));
		json["now"] = NowTaptapTimeValue;
		return json;
	}
	private async Task<JsonResult> LoadTapTapJsonFromFileAndReturn(string path)
	{
		return this.Json(await LoadFromFileAndModifyTime(path));
	}

	[HttpDelete]
	[Route("api/cookies")]
	public IActionResult CookiesDelete()
	{
		//this.Response.Cookies.Delete("acw_tc");
		//this.Response.Cookies.Delete("ssxmod_itna");
		//this.Response.Cookies.Delete("ssxmod_itna2");
		//this.Response.Cookies.Delete("ACCOUNTS_VID");
		//this.Response.Cookies.Delete("ACCOUNTS_USER_ID");
		//this.Response.Cookies.Delete("ACCOUNTS_SESS");
		foreach (KeyValuePair<string, string> item in this.Request.Cookies)
		{
			this.Response.Cookies.Delete(item.Key);
		}

		return this.Ok();
	}

	[HttpGet]
	[Route("api/account/grants")]
	public async Task AccountGrants() => await this.ProxyTo(TaptapAccountHost);
	[HttpGet]
	[Route("api/account/login-method")]
	public async Task AccountLoginMethod() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/account/delete")]
	public async Task AccountDelete() => await this.ProxyTo(TaptapAccountHost);

	[HttpGet]
	[Route("api/config")]
	public async Task Config() => await this.ProxyTo(TaptapAccountHost);

	[HttpPost]
	[Route("api/delete_account/active")]
	public async Task DeleteAccountActive() => await this.ProxyTo(TaptapAccountHost);

	[HttpGet]
	[Route("api/device/list")]
	public async Task DeviceList() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/device/logout")]
	public async Task DeviceLogout() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/device-code/get")]
	public async Task DeviceCodeGet() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/device-code/login")]
	public async Task DeviceCodeLogin() => await this.ProxyTo(TaptapAccountHost);

	[HttpPost]
	[Route("api/email/activate")]
	public async Task EmailActivate() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/email/bind")]
	public async Task EmailBind() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/email/bind-set-password")]
	public async Task EmailBindSetPassword() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/email/bind-verify")]
	public async Task EmailBindVerify() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/email/change-bind")]
	public async Task EmailChangeBind() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/email/change-bind-verify")]
	public async Task EmailChangeBindVerify() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/email/login")]
	public async Task EmailLogin() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/email/registered")]
	public async Task EmailRegistered() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/email/send")]
	public async Task EmailSend() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/email/send-activate")]
	public async Task EmailSendActivate() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/email/send-by-guest")]
	public async Task EmailSendByGuest() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/email/unbind")]
	public async Task EmailUnbind() => await this.ProxyTo(TaptapAccountHost);
	[HttpGet]
	[Route("api/email/activated")]
	public async Task EmailActivated() => await this.ProxyTo(TaptapAccountHost);

	[HttpPost]
	[Route("api/first-party/login")]
	public async Task FirstPartyLogin() => await this.ProxyTo(TaptapAccountHost);

	[HttpGet]
	[Route("api/oauth2/auth")]
	public async Task Oauth2Auth()
	{
		await this.ProxyAndModifyJsonSubData(TaptapAccountHost, node =>
		{
			node["client"].DoIfNotNull(x => x["icon_url"] = "/icon.png");
			node["user"].DoIfNotNull(x => x["avatar_url"] = "/avatar.png");
		});

		//await this.ProxyTo(TaptapAccountHost);
	}
	[HttpPost]
	[Route("api/oauth2/approve")]
	public async Task Oauth2Approve()
	{
		await this.ProxyAndModifyJsonSubData(TaptapAccountHost, x => x["redirect_uri"] = "/close");
	}
	[HttpPost]
	[Route("api/oauth2/deny")]
	public async Task Oauth2Deny() => await this.ProxyTo(TaptapAccountHost);
	[HttpGet]
	[Route("api/oauth2/logout")]
	public async Task Oauth2Logout() => await this.ProxyTo(TaptapAccountHost);

	[HttpPost]
	[Route("api/order/recent-list")]
	public async Task OrderRecentList() => await this.ProxyTo(TaptapAccountHost);

	[HttpPost]
	[Route("api/password/login")]
	public async Task PasswordLogin() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/password/register")]
	public async Task PasswordRegister() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/password/set")]
	public async Task PasswordSet() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/password/update")]
	public async Task PasswordUpdate() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/password/update-verify")]
	public async Task PasswordUpdateVerify() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/password/verify")]
	public async Task PasswordVerify() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/password/verify-by-prev")]
	public async Task PasswordVerifyByPrev() => await this.ProxyTo(TaptapAccountHost);

	[HttpPost]
	[Route("api/phone/bind")]
	public async Task PhoneBind() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/phone/bind-verify")]
	public async Task PhoneBindVerify() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/phone/change-bind")]
	public async Task PhoneChangeBind() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/phone/change-bind-verify")]
	public async Task PhoneChangeBindVerify() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/phone/login")]
	public async Task PhoneLogin() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/phone/login-by-verify-token")]
	public async Task PhoneLoginByVerifyToken() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/phone/preregister-bind-phone")]
	public async Task PhonePreregisterBindPhone() => await this.ProxyTo(TaptapAccountHost);
	[HttpGet]
	[Route("api/phone/regions")]
	public async Task<IActionResult> PhoneRegions()
	{
		return await this.LoadTapTapJsonFromFileAndReturn("./wwwroot/resources/region.json");
	}
	[HttpPost]
	[Route("api/phone/send")]
	public async Task PhoneSend() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/phone/send-by-guest")]
	public async Task PhoneSendByGuest() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/phone/unbind")]
	public async Task PhoneUnbind() => await this.ProxyTo(TaptapAccountHost);

	[HttpPost]
	[Route("api/profile/preregister-update-profile")]
	public async Task ProfilePreregisterUpdateProfile() => await this.ProxyTo(TaptapAccountHost);
	[HttpGet]
	[Route("/api/profile/default-avatar")]
	public async Task ProfileDefaultAvatar() => await this.ProxyTo(TaptapAccountHost);

	[HttpPost]
	[Route("api/social/login")]
	public async Task SocialLogin() => await this.ProxyTo(TaptapAccountHost);
	[HttpGet]
	[Route("api/social/callback")]
	public async Task SocialCallback() => await this.ProxyTo(TaptapAccountHost);
	[HttpGet]
	[Route("api/social/connect")]
	public IActionResult SocialConnect()
	{
		// {"data":{"connect_url":"/social_disabled"},"now":1745721984,"success":true}
		return this.Json(MakeTapTapResponse(new
		{
			ConnectUrl = "/social_disabled"
		}));

		//await this.ProxyAndModifyJsonSubData(TaptapAccountHost, node =>
		//{
		//	node["connect_url"] = "/social_disabled";
		//	return;

		//	if (node["connect_url"] is null) return;
		//	UriBuilder original = new((string)node["connect_url"]!);
		//	System.Collections.Specialized.NameValueCollection parsed = HttpUtility.ParseQueryString(original.Query);
		//	Uri nowUri = new(this.Request.GetEncodedUrl());
		//	UriBuilder redirectUri = new(parsed["redirect_uri"]!)
		//	{
		//		Host = nowUri.Host,
		//		Port = nowUri.Port,
		//		Scheme = nowUri.Scheme
		//	};
		//	parsed["redirect_uri"] = redirectUri.ToString();
		//	original.Query = parsed.ToString();
		//	node["connect_url"] = original.ToString();
		//});
	}

	[HttpGet]
	[Route("api/takeout/userinfo")]
	public async Task TakeoutUserinfo() => await this.ProxyTo(TaptapAccountHost);

	[HttpGet]
	[Route("api/upload")]
	public async Task Upload() => await this.ProxyTo(TaptapAccountHost);

	[HttpPost]
	[Route("api/user/avatar")]
	public async Task UserAvatar() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/user/basic-info")]
	public async Task UserBasicInfo() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/user/consignee")]
	public async Task UserConsignee() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/user/create-idcard")]
	public async Task UserCreateIdcard() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/user/del-authorized-scope")]
	public async Task UserDelAuthorizedScope() => await this.ProxyTo(TaptapAccountHost);
	[HttpGet]
	[Route("api/user/authorized-client")]
	public async Task UserAuthorizedClient() => await this.ProxyTo(TaptapAccountHost);
	[HttpGet]
	[Route("api/user/authorized-clients")]
	public async Task UserAuthorizedClients() => await this.ProxyTo(TaptapAccountHost);
	[HttpGet]
	[Route("api/user/idcard")]
	public async Task UserIdcard() => await this.ProxyTo(TaptapAccountHost);
	[HttpGet]
	[Route("api/user/info")]
	public async Task UserInfo() => await this.ProxyTo(TaptapAccountHost);
	[HttpGet]
	[Route("api/user/profile")]
	public async Task UserProfile()
	{
		await this.ProxyAndModifyJsonSubData(TaptapAccountHost, x => x["avatar"] = "/avatar.png");
	}
	[HttpPost]
	[Route("api/user/revoke-authorized-client")]
	public async Task UserRevokeAuthorizedClient() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/user/validate-birthday")]
	public async Task UserValidateBirthday() => await this.ProxyTo(TaptapAccountHost);
	[HttpPost]
	[Route("api/user/validate-nickname")]
	public async Task UserValidateNickname() => await this.ProxyTo(TaptapAccountHost);

	[HttpGet]
	[Route("social/wechatweb/callback-for-accounts")]
	public IActionResult WechatCallbackRedirection() => this.RedirectPreserveQueries("/social/callback/wechatweb");
}
