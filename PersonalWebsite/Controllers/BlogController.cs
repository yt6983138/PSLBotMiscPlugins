using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PersonalWebsite.Services;
using System.Text;

namespace PersonalWebsite.Controllers;
public class BlogController : CustomControllerBase
{
	private readonly IOptions<Config> _config;
	private readonly BlogManagerService _blogManager;

	public BlogController(IOptions<Config> config, BlogManagerService blogManager)
	{
		this._config = config;
		this._blogManager = blogManager;
	}

	[HttpPatch("personal/api/blog/RefreshBlogs")]
	public async Task<IActionResult> RefreshBlogs()
	{
		string password = await new StreamReader(this.Request.Body, Encoding.UTF8).ReadToEndAsync();
		if (password != this._config.Value.SuperSecretPassword)
		{
			return this.Unauthorized();
		}

		this._blogManager.RefreshBlogs();
		return this.Ok();
	}

	[HttpGet("personal/api/blog/Blogs")]
	public IActionResult GetBlogs()
	{
		return this.Json(this._blogManager.BlogFiles.Select(x => new
		{
			x.MainContent.Name,
			LastModified = x.MainContent.LastWriteTimeUtc,
			Created = x.MainContent.CreationTimeUtc,
			x.Summary
		}));
	}
	[HttpGet("personal/api/blog/ByName/{blogName}")]
	public IActionResult GetBlogByName(string blogName)
	{
		BlogInfo? blogFile = this._blogManager.BlogFiles.FirstOrDefault(x => x.MainContent.Name == blogName);
		if (blogFile is null || !blogFile.MainContent.Exists)
		{
			return this.NotFound();
		}
		return this.PhysicalFile(blogFile.MainContent.FullName, "text/markdown");
	}
	[HttpGet("personal/api/blog/InfoByName/{blogName}")]
	public IActionResult GetBlogInfoByName(string blogName)
	{
		BlogInfo? info = this._blogManager.BlogFiles.FirstOrDefault(x => x.MainContent.Name == blogName);
		if (info is null)
		{
			return this.NotFound();
		}
		return this.Json(new
		{
			info.MainContent.Name,
			LastModified = info.MainContent.LastWriteTimeUtc,
			Created = info.MainContent.CreationTimeUtc,
			info.Summary
		});
	}
	[HttpGet("personal/blogView/{blogName}")]
	public VirtualFileResult BlogView(string blogName)
	{
		return this.File("/personal/blogView.html", "text/html");
	}
}
