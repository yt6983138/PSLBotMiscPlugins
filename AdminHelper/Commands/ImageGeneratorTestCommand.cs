using Newtonsoft.Json.Linq;
using PSLDiscordBot.Core.ImageGenerating;
using PuppeteerSharp;
using System.Diagnostics;

namespace AdminHelper.Commands;

[AddToGlobal]
public class ImageGeneratorTestCommand : AdminCommandBase
{
	private readonly ImageGenerator _imageGenerator;
	private readonly IOptions<AdminConfig> _adminConfig;
	private readonly SaveService _saveService;

	public ImageGeneratorTestCommand(IServiceProvider provider, ImageGenerator imageGenerator, IOptions<AdminConfig> adminConfig, SaveService saveService)
		: base(provider)
	{
		this._imageGenerator = imageGenerator;
		this._adminConfig = adminConfig;
		this._saveService = saveService;
	}

	public override OneOf<string, LocalizedString> PSLName => "image-generator-test";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] test image generator";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder
		.AddOption(
			"trim",
			ApplicationCommandOptionType.Boolean,
			"Trim generated user data, overrides extra args if specified",
			isRequired: false)
		.AddOption(
			"user_id",
			ApplicationCommandOptionType.User,
			"User to use as the context (uncensored)",
			isRequired: false)
		.AddOption(
			"html_path",
			ApplicationCommandOptionType.String,
			"Path to the HTML file",
			isRequired: false)
		.AddOption(
			"extra_args",
			ApplicationCommandOptionType.String,
			"Extra arguments as json",
			isRequired: false);

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		string? htmlPath = arg.GetOptionOrDefault<string>("html_path");
		string? extraArgs = arg.GetOptionOrDefault<string>("extra_args");
		ulong userId = arg.GetOptionOrDefault<IUser>("user_id")?.Id ?? arg.User.Id;
		bool trim = arg.GetOptionOrDefault<bool>("trim");

		data = await requester.GetUserDataDirectlyAsync(userId);
		if (data is null)
		{
			await arg.QuickReply("User not found in database");
			return;
		}

		Stopwatch stopwatch = Stopwatch.StartNew();

		ISaveContext? context = await this._saveService.TryHandleAndFetchAsync(data, arg);
		if (context is null) return;
		TimeSpan contextTook = stopwatch.GetElapsedAndRestart();

		PlayerInfo playerInfo = await this._saveService.GetPlayerInfoAsync(data, context);
		TimeSpan playerInfoTook = stopwatch.GetElapsedAndRestart();

		// note: the image generator still uses newtonsoft.json, might need to unify json usage in the future
		JObject extraArgsNode = extraArgs is null ? [] : JObject.Parse(extraArgs);
		if (trim)
			extraArgsNode["TrimGeneratedPlayerData"] = true;

		BasicHtmlImageInfo renderInfo = this._adminConfig.Value.ImageGeneratorTestImageInfo;
		if (htmlPath is not null)
			renderInfo = renderInfo with { HtmlPath = htmlPath };

		(TextMap_Anonymous, ImageMap_Anonymous) maps = this._imageGenerator.CreateMaps(data, context, playerInfo);
		maps.Item1.ExtraArguments = extraArgsNode;

		stopwatch.Restart();
		Stream photo = await this._imageGenerator.MakePhoto(maps.Item1, maps.Item2, renderInfo, ScreenshotType.Jpeg, 75);
		TimeSpan photoTook = stopwatch.GetElapsedAndRestart();

		await arg.QuickReplyWithAttachments($"Done (Context: {contextTook}, PlayerInfo: {playerInfoTook}, Photo: {photoTook})", [new(photo, "test.jpg")]);
	}
}
file static class Extension
{
	public static TimeSpan GetElapsedAndRestart(this Stopwatch self)
	{
		self.Stop();
		TimeSpan elapsed = self.Elapsed;
		self.Restart();
		return elapsed;
	}
}
