namespace ArchiveProgramRunHelper;

public class Program
{
	public static async Task Main(string[] args)
	{
		DirectoryInfo pluginDir = Directory.CreateDirectory("./Plugins/0200.ArchiveProgram");

		FileInfo[] pluginFiles = new DirectoryInfo(".").GetFiles("SaveArchiveProgram*");
		foreach (FileInfo file in pluginFiles)
		{
			file.CopyTo(Path.Combine(pluginDir.FullName, file.Name), true);
		}

		await CoreRunHelper.Program.Main(args);
	}
}
