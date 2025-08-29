using Microsoft.OpenApi.Models;
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
	public void Apply(OpenApiSchema schema, SchemaFilterContext context)
	{
		if (context.Type.IsGenericType && context.Type.GetGenericTypeDefinition() == typeof(NoRead<>))
		{
			Type innerType = context.Type.GetGenericArguments()[0];

			if (!context.SchemaRepository.TryLookupByType(innerType, out OpenApiSchema? innerSchema))
				innerSchema = context.SchemaGenerator.GenerateSchema(innerType, context.SchemaRepository);

			schema.Type = innerSchema.Type;
			schema.Properties = innerSchema.Properties;
			schema.Required = innerSchema.Required;
			schema.Description = innerSchema.Description;
			schema.Format = innerSchema.Format;
			schema.Items = innerSchema.Items;
			schema.AdditionalProperties = innerSchema.AdditionalProperties;
			schema.Enum = innerSchema.Enum;
			schema.Example = innerSchema.Example;
			schema.Reference = innerSchema.Reference;
		}
	}
}
