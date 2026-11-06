using PSLDiscordBot.Core.ImageGenerating;

namespace AdminHelper.Commands;

[AddToGlobal]
public class TryFixImageGeneratorCommand : AdminCommandBase
{
	private readonly ImageGenerator _imageGenerator;

	public TryFixImageGeneratorCommand(IServiceProvider provider, ImageGenerator generator) : base(provider)
	{
		this._imageGenerator = generator;
	}

	public override OneOf<string, LocalizedString> PSLName => "try-fix-image-generator";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] Try to fix image generator";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder
		.AddOption(
			"delay",
			ApplicationCommandOptionType.Integer,
			"Delay after dispose and before setting up engine, in seconds",
			isRequired: false,
			minValue: 0);

	public override async Task RootCallback(SocketSlashCommand arg, UserData? data)
	{
		int seconds = arg.GetIntegerOptionAsInt32OrDefault("delay", 10);

		await arg.QuickReply("Restarting...");
		await this._imageGenerator.RestartUnderlyingChromium(TimeSpan.FromSeconds(seconds));
		await arg.QuickReply("Done");
	}
}
