using System.Text.Json;

namespace PersonalWebsite.Services;

public record class BlogSummary(string Title, string Preview, string? PreviewImage);
public record class BlogInfo(FileInfo MainContent, BlogSummary Summary);
public class BlogManagerService
{
	private ILogger<BlogManagerService> _logger;

	public DirectoryInfo BlogDirectory { get; set; } = new DirectoryInfo("./Blogs/");
	public List<BlogInfo> BlogFiles { get; set; } = [];

	public BlogManagerService(ILogger<BlogManagerService> logger)
	{
		this._logger = logger;
		if (!this.BlogDirectory.Exists)
		{
			this.BlogDirectory.Create();
		}
		this.RefreshBlogs();
	}

	public void RefreshBlogs()
	{
		this._logger.LogInformation("Refreshing blogs in {BlogDirectory}", this.BlogDirectory.FullName);

		this.BlogFiles.Clear();
		foreach (FileInfo file in this.BlogDirectory.GetFiles().Where(x => x.Extension == ".md" && !x.Name.StartsWith("__")))
		{
			this._logger.LogDebug("Found blog file: {FileName}", file.Name);
			FileInfo summaryFile = new($"{file.FullName[0..^3]}.summary.json");
			using FileStream stream = summaryFile.OpenRead();
			this.BlogFiles.Add(new(file, JsonSerializer.Deserialize<BlogSummary>(stream) ?? throw new InvalidDataException()));
		}
	}
}
