
using System.Net.Http.Headers;

namespace PhigrosLoginHost;

public class CustomStreamContent : StreamContent
{
	public CustomStreamContent(Stream content, string? contentType)
		: base(content)
	{
		base.Headers.ContentType = MediaTypeHeaderValue.Parse(contentType ?? "text/plain");
	}
}
