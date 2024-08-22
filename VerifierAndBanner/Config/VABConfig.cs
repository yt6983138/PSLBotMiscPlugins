namespace VerifierAndBanner.Config;
public class VABConfig
{
	public ulong GuildId { get; set; } = 1165154972665659412;
	public ulong OperationAnnouncementChannelId { get; set; } = 1165168706322710598;
	public ulong AntiRaidChannelId { get; set; } = 1165163099997864046;
	public ulong VerifyChannelId { get; set; } = 1165179055734259792;
	public string VerifyKeyword { get; set; } = "Amongus Sus";
	public List<ulong> RolesToAdd { get; set; } = new() { 1165156897909919744 };
	public int BanPruneDays { get; set; } = 7;
}
