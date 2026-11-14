namespace LocalizationTool.Commands;

[AddToGlobal]
public class LocalizationToCsv : AdminCommandBase
{
	public LocalizationToCsv(IServiceProvider provider) : base(provider)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "localization-to-csv";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] Convert localization to csv";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder;

	public override async Task RootCallback(SocketSlashCommand arg, UserData? data)
	{
		string csv = await LocalizationCsv.FromLocalizedStrings(this._localization.Data.Strings).SerializeAsCsvAsync();

		await arg.QuickReplyWithAttachments("e done", PSLUtils.ToAttachment(csv, "localization.csv"));
	}
}
