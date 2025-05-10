namespace PhigrosLoginHost;

public static class Helper
{
	public static T DoIfNotNull<T>(this T? value, Action<T> action) where T : notnull
	{
		if (value is not null) action.Invoke(value!);
		return value!;
	}
}
