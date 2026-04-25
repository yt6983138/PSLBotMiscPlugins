using LibCpp2IL.Logging;
using Microsoft.Extensions.Options;
using PhiInfo.CLI;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Framework.Localization;
using System.Text.Json;

namespace AdminHelper.Services;

public class PhigrosDataUpdateService
{
	private readonly struct ExecuteBlockAtEnd : IDisposable
	{
		private readonly Action _finalizeAction;
		public ExecuteBlockAtEnd(Action finalizeAction)
		{
			this._finalizeAction = finalizeAction;
		}
		public void Dispose()
		{
			this._finalizeAction();
		}
	}

	private readonly IOptions<Config> _configService;
	private readonly ILogger<PhigrosDataUpdateService> _logger;
	private readonly ILogger<CLIExtractor> _extractorLogger;
	private readonly ILogger<CLI> _cliLogger;
	private readonly StatusService _statusService;
	private readonly PhigrosService _phigrosService;

	/// <summary>
	/// stream properties are ignored and overriden
	/// </summary>
	public ExtractOptions ExtractOptions { get; set; }
	public int MaxDegreeOfParallelism { get; set; } = 5;

	public PhigrosDataUpdateService(
		IOptions<Config> config,
		ILogger<PhigrosDataUpdateService> logger,
		ILogger<CLIExtractor> extractorLogger,
		ILogger<CLI> cliLogger,
		ILogger<Cpp2IlILoggerWriter> cpp2ilLogger,
		StatusService statusService,
		PhigrosService phigrosService)
	{
		this._configService = config;
		this._logger = logger;
		this._extractorLogger = extractorLogger;
		this._cliLogger = cliLogger;
		this._statusService = statusService;
		this._phigrosService = phigrosService;
		LibLogger.Writer = new Cpp2IlILoggerWriter(cpp2ilLogger);

		this.ExtractOptions = new()
		{
			NoIllustration = true,
			NoMusic = true,
			NoCharts = true,
		};
	}

	private void TrySaveJson(string location, object data)
	{
		try
		{
			File.WriteAllText(location, JsonSerializer.Serialize(data, CLI.JsonOptions), CLI.UTF8WithoutBOM);
		}
		catch (Exception ex)
		{
			this._logger.LogError(ex, "Failed to write json to {Location}", location);
		}
	}
	public async Task UpdateData()
	{
		this._statusService.CurrentStatus = Status.UpdatingData;

		try
		{
			await this.UpdateDataCore();
		}
		finally
		{
			this._statusService.CurrentStatus = Status.Normal;
		}
	}
	private async Task UpdateDataCore()
	{
		using HttpClient httpClient = new();

		FileInfo apkFile = await CLI.DownloadApk("TAPTAP", null, this._cliLogger);
		FileInfo classDataFile = await CLI.DownloadClassData("AUTO", null, this._cliLogger);

		this.ExtractOptions.ApkFile = apkFile.OpenRead();
		this.ExtractOptions.ObbFile = apkFile.OpenRead();
		this.ExtractOptions.AuxObbFile = null;
		this.ExtractOptions.ClassDataFile = classDataFile.OpenRead();

		CLIExtractor extractor = await CLIExtractor.FromOptionAsync(this.ExtractOptions, this._extractorLogger);

		// set to phigros service and writing files are defered to end,
		// to prevent the service from being in an inconsistent state when exception is thrown during extraction
		NonMultiLanguageInfos nonLanguageSpecificInfo = extractor.ExtractNonLanguageSpecificInfo();
		Dictionary<PhiInfo.Core.Models.Language, MultiLanguageInfos> multiLanguageInfos = Enum.GetValues<PhiInfo.Core.Models.Language>()
			.ToDictionary(x => x, extractor.ExtractLanguageSpecificInfo);

		this.TrySaveJson(this._configService.Value.NonMultiLanguageInfoLocation, nonLanguageSpecificInfo);
		this._phigrosService.NonMultiLanguageInfos = nonLanguageSpecificInfo;

		foreach ((PhiInfo.Core.Models.Language lang, MultiLanguageInfos? multiLangInfo) in multiLanguageInfos)
		{
			this.TrySaveJson(string.Format(this._configService.Value.MultiLanguageInfoLocationFormat, lang), multiLangInfo);
			// hacky workaround since they have same member name but different type and value
			this._phigrosService.MultiLanguageInfos[Enum.Parse<Language>(lang.ToString())] = multiLangInfo;
		}

		AssetExtractionContext context = extractor.CreateAssetExtractionContext(this.HandleFile);

		await Parallel.ForEachAsync(
			extractor.AddressableBundleExtractor!.ListMeaningfulAssetPathsInCatalog(),
			new ParallelOptions() { MaxDegreeOfParallelism = this.MaxDegreeOfParallelism },
			async (item, _) =>
		{
			try
			{
				await context.ExtractAsset(item);
			}
			catch (Exception ex)
			{
				this._logger.LogError(ex, "Failed to extract asset {AssetPath}", item);
			}
		});

		this.TrySaveJson(this._configService.Value.AvatarHashMapLocation, context.AvatarMap);
	}
	private async Task HandleFile(string path, Stream stream)
	{
		string outputPath = Path.Combine(Environment.CurrentDirectory, path);
		Directory.CreateDirectory(Path.GetDirectoryName(outputPath)!);
		using FileStream outputStream = new(outputPath, FileMode.Create, FileAccess.Write);
		await stream.CopyToAsync(outputStream);
	}
}
