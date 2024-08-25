namespace FunPlugin;

public record class PokeRandomShowInfo(float Weight, string Message, string? AttachmentPath = null);
public class FPConfig
{
	public List<PokeRandomShowInfo> PokeRandoms { get; set; } = new()
	{
		new(1, "Huh? (●´π`●)"),
		new(1, "Sup?"),
		new(1, @"*sleeping\*"),
		new(1, @"\_(´ཀ`」 ∠) _"),
		new(1, "ehh, huh, huh, eraaaaaaaaaaaaaammmmm, aaaaaaaaaaaaaaaaah, aaaaaaaaaaaaaaaaaaa... x114514"),
		new(1, "Yum"),
		new(1, "oiiaiooiiai"),
		new(1, @"你幹嘛~哈哈哎呦\~"),
		new(1, "Huh? (A cat looking back at you with confused face)"),
		new(1, "Never gonna give you up"),

		new(1, " ", "./MiscPlugins/FPAssets/hug_rickroll.gif"),
		new(1, " ", "./MiscPlugins/FPAssets/geod114.webp"),
		new(1, " ", "./MiscPlugins/FPAssets/geo_hug.webp"),
		new(1, " ", "./MiscPlugins/FPAssets/geo_drool.webp"),
		new(1, " ", "./MiscPlugins/FPAssets/cameilla_hi.png"),
		new(1, " ", "./MiscPlugins/FPAssets/eat_mope.webp"),
		new(1, " ", "./MiscPlugins/FPAssets/colorful_maomao.gif"),
		new(1, " ", "./MiscPlugins/FPAssets/bugjump1080p.gif"),
		new(1, " ", "./MiscPlugins/FPAssets/slownet.gif"),
		new(1, " ", "./MiscPlugins/FPAssets/sus_carl.gif"),
	};
}
