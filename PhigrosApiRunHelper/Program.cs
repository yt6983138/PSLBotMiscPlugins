namespace PhigrosApiRunHelper;

public class Program
{
	public static async Task Main(string[] args)
	{
		DirectoryInfo pluginDir = Directory.CreateDirectory("./Plugins/0200.PhigrosApi");

		FileInfo[] pluginFiles = new DirectoryInfo(".").GetFiles("PhigrosApi*");
		foreach (FileInfo file in pluginFiles)
		{
			file.CopyTo(Path.Combine(pluginDir.FullName, file.Name), true);
		}

		await CoreRunHelper.Program.Main(args);
	}
}
