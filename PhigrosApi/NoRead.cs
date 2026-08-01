using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

namespace PhigrosApi;

public struct NoRead<T>
{
	public T Value { get; set; }

	public NoRead(T value)
	{
		this.Value = value;
	}
}

public class NoReadSchemaTransformer : IOpenApiSchemaTransformer
{
	public async Task TransformAsync(OpenApiSchema schema, OpenApiSchemaTransformerContext context, CancellationToken cancellationToken)
	{
		Type type = context.JsonTypeInfo.Type;

		if (!type.IsGenericType || type.GetGenericTypeDefinition() != typeof(NoRead<>))
			return;

		Type innerType = type.GetGenericArguments()[0];
		OpenApiSchema innerSchema = await context.GetOrCreateSchemaAsync(innerType, cancellationToken: cancellationToken);

		schema.Type = innerSchema.Type;
		schema.Properties = innerSchema.Properties;
		schema.Required = innerSchema.Required;
		schema.Description = innerSchema.Description;
		schema.Format = innerSchema.Format;
		schema.Items = innerSchema.Items;
		schema.AdditionalProperties = innerSchema.AdditionalProperties;
		schema.AdditionalPropertiesAllowed = innerSchema.AdditionalPropertiesAllowed;
		schema.Enum = innerSchema.Enum;
		schema.Example = innerSchema.Example;
		schema.AllOf = innerSchema.AllOf;
	}
}
