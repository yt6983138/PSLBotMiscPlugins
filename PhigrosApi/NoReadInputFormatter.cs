using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Net.Http.Headers;
using System.Net.Mime;
using System.Runtime.CompilerServices;
using System.Text;

namespace PhigrosApi;

public class NoReadInputFormatter : TextInputFormatter
{
	public NoReadInputFormatter()
	{
		this.SupportedMediaTypes.Add(new MediaTypeHeaderValue(MediaTypeNames.Application.Json));
		this.SupportedEncodings.Add(Encoding.UTF8);
		this.SupportedEncodings.Add(Encoding.Unicode);
	}

	protected override bool CanReadType(Type type)
		=> type.IsGenericType && type.GetGenericTypeDefinition() == typeof(NoRead<>);

	public override Task<InputFormatterResult> ReadRequestBodyAsync(InputFormatterContext context, Encoding encoding)
	{
		return InputFormatterResult.SuccessAsync(RuntimeHelpers.GetUninitializedObject(context.ModelType));
	}
}
