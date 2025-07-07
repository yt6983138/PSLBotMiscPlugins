namespace PersonalWebsite;
public class Config
{
	public string SuperSecretPassword { get; set; } = Random.Shared.NextInt64().ToString();
}
