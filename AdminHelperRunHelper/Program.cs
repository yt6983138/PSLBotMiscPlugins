namespace AdminHelperRunHelper;

public class Program
{
	public static async Task Main(string[] args)
	{
		DirectoryInfo pluginDir = Directory.CreateDirectory("./Plugins/0200.AdminHelper");

		FileInfo[] pluginFiles = new DirectoryInfo(".").GetFiles("AdminHelper*");
		foreach (FileInfo file in pluginFiles)
		{
			file.CopyTo(Path.Combine(pluginDir.FullName, file.Name), true);
		}

		await CoreRunHelper.Program.Main(args);
	}
}