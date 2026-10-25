namespace AdminHelper.Commands;

[AddToGlobal]
public class BugMeCommand : AdminCommandBase
{
	public BugMeCommand(IServiceProvider provider)
		: base(provider)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "bug-me";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] Can be used to test exception handling.";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder
		.AddOption(
			"reply",
			ApplicationCommandOptionType.Boolean,
			"Should reply before throw",
			isRequired: true)
		.AddOption(
			"interaction",
			ApplicationCommandOptionType.Boolean,
			"Test interaction",
			isRequired: true);

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		bool reply = arg.GetOption<bool>("reply");
		bool interaction = arg.GetOption<bool>("interaction");

		if (interaction)
		{
			await arg.QuickReply("click me", x => x.Components = new ComponentBuilderV2()
				.WithActionRow([new ButtonBuilder()
					.WithCustomId(this.CreateComponentId([(byte)(reply ? 1 : 0)]))
					.WithLabel("click")
					.WithStyle(ButtonStyle.Primary)])
				.Build());
			return;
		}

		if (reply)
			await arg.QuickReply("Thrown exception.");

		throw new NotImplementedException("Testing");
	}

	public override async Task HandleInteraction(SocketInteraction arg, object executer)
	{
		if (arg is not SocketMessageComponent component) return;

		bool shouldReply = component.GetComponentPayload()[0] != 0;

		if (shouldReply)
			await arg.QuickReply("Thrown exception.");

		throw new NotImplementedException("testing interaction");
	}
}

