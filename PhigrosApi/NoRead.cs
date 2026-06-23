using Microsoft.OpenApi;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace PhigrosApi;

[SwaggerSchemaFilter(typeof(NoReadFilter))]
public struct NoRead<T>
{
	public T Value { get; set; }

	public NoRead(T value)
	{
		this.Value = value;
	}
}

public class NoReadFilter : ISchemaFilter
{
	public void Apply(IOpenApiSchema schema, SchemaFilterContext context)
	{
		if (!context.Type.IsGenericType || context.Type.GetGenericTypeDefinition() != typeof(NoRead<>))
			return;

		if (schema is not OpenApiSchema openApiSchema)
			return;

		Type innerType = context.Type.GetGenericArguments()[0];
		IOpenApiSchema innerSchema;
		if (!context.SchemaRepository.TryLookupByType(innerType, out OpenApiSchemaReference? _innerSchema))
			innerSchema = context.SchemaGenerator.GenerateSchema(innerType, context.SchemaRepository);
		else innerSchema = _innerSchema;

		openApiSchema.Type = innerSchema.Type;
		openApiSchema.Properties = innerSchema.Properties;
		openApiSchema.Required = innerSchema.Required;
		openApiSchema.Description = innerSchema.Description;
		openApiSchema.Format = innerSchema.Format;
		openApiSchema.Items = innerSchema.Items;
		openApiSchema.AdditionalProperties = innerSchema.AdditionalProperties;
		openApiSchema.Enum = innerSchema.Enum;
		openApiSchema.Example = innerSchema.Example;
	}
}
