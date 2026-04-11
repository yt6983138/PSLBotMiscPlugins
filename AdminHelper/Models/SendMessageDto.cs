namespace AdminHelper.Models;

public class SendMessageDto
{
	public struct Attachment
	{
		public string FileName { get; set; }
		public string Base64Content { get; set; }

		public Attachment(string fileName, string base64Content)
		{
			this.FileName = fileName;
			this.Base64Content = base64Content;
		}
	}

	public ulong RecipientId { get; set; }
	public string Content { get; set; } = null!;
	public List<Attachment> Attachments { get; set; } = [];
}
