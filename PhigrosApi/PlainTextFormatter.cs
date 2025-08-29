using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Net.Http.Headers;
using System.Text;

namespace PhigrosApi;

public class PlainTextFormatter : TextInputFormatter
{
	public PlainTextFormatter()
	{
		this.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/plain"));
		this.SupportedEncodings.Add(Encoding.UTF8);
		this.SupportedEncodings.Add(Encoding.Unicode);
	}

	protected override bool CanReadType(Type type) =>
		type == typeof(string);

	//protected override bool CanWriteType(Type type) =>
	//	type == typeof(string);

	public override async Task<InputFormatterResult> ReadRequestBodyAsync(InputFormatterContext context, Encoding effectiveEncoding)
	{
		using StreamReader reader = new(context.HttpContext.Request.Body, effectiveEncoding);

		string content = await reader.ReadToEndAsync();
		return await InputFormatterResult.SuccessAsync(content);
	}

	//public override async Task WriteToStreamAsync(Type type, object value, Stream writeStream, HttpContent content, TransportContext transportContext, CancellationToken cancellationToken)
	//{
	//	StreamWriter streamReader = new(writeStream);
	//	await streamReader.WriteAsync((string)value);
	//}
}
