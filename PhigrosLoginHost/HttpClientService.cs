namespace PhigrosLoginHost;

public sealed class HttpClientService : IDisposable
{
	public HttpClient AutoDecompressClient { get; set; } = GetDecompressClient();
	public HttpClient Client { get; set; } = GetDefaultClient();

	private static HttpClient GetDefaultClient()
	{
		HttpClientHandler handler = new()
		{
#if DEBUG
			ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator,
#endif
			UseCookies = false
		};
		//handler.ClientCertificates.Add(X509Certificate2.CreateFromSignedFile("C:\\Users\\tgg\\AppData\\Local\\httptoolkit\\Config\\ca.pem"));
		return new(handler);
	}
	private static HttpClient GetDecompressClient()
	{
		HttpClientHandler handler = new()
		{
#if DEBUG
			ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator,
#endif
			AutomaticDecompression = System.Net.DecompressionMethods.All,
			UseCookies = false
		};
		return new(handler);
	}

	~HttpClientService()
	{
		this.Dispose();
	}
	public void Dispose()
	{
		this.Client.Dispose();
		this.AutoDecompressClient.Dispose();
		GC.SuppressFinalize(this);
	}
}
