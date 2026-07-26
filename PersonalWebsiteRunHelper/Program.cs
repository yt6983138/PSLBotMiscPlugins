namespace PersonalWebsiteRunHelper;

public class Program
{
	public static async Task Main(string[] args)
	{
		DirectoryInfo pluginDir = Directory.CreateDirectory("./Plugins/0300.PersonalWebsite");

		FileInfo[] pluginFiles = new DirectoryInfo(".").GetFiles("PersonalWebsite*");
		foreach (FileInfo file in pluginFiles)
		{
			file.CopyTo(Path.Combine(pluginDir.FullName, file.Name), true);
		}

		// prob not a good idea to do so
		CoreRunHelper.Program.TryDeleteFolder(new("./wwwroot"));
		CoreRunHelper.Program.TryDeleteFolder(new("./Blogs"));
		Directory.CreateSymbolicLink("./wwwroot", Path.GetFullPath("../../../../PersonalWebsite/wwwroot"));
		Directory.CreateSymbolicLink("./Blogs", Path.GetFullPath("../../../../PersonalWebsite/Blogs"));

		// currently, it throws some error regarding to localization keys, but it should be fine since im just testing website
		// TODO: figure this out
		await PhigrosApiRunHelper.Program.Main(args);
	}
}
