using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminHelper.Models;

public enum ReportFlag
{
	Unread,
	Processing,
	Resolved,

	SentByUs = 1 << 31,
}
[PrimaryKey(nameof(Id))]
public class ReportMessage
{
	public struct AttachmentInfo
	{
		public string Hash { get; set; }
		public string OriginalFileName { get; set; }

		public AttachmentInfo(string hash, string originalFileName)
		{
			this.Hash = hash;
			this.OriginalFileName = originalFileName;
		}
	}

	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	public long Id { get; set; }
	public long? AuthorId { get; set; }
	public long? RecipientId { get; set; }
	public long? MessageId { get; set; }
	public DateTime TimeStamp { get; set; }
	public string Content { get; set; }
	public ReportFlag Status { get; set; }
	[NotMapped]
	public AttachmentInfo[] Attachments { get; set; }

	[Obsolete("This is reserved for EF mapper. Do not use it.")]
	public string? AttachmentsJson
	{
		get => JsonConvert.SerializeObject(this.Attachments);
		set => this.Attachments = value is null ? [] : JsonConvert.DeserializeObject<AttachmentInfo[]>(value) ?? [];
	}

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
	private ReportMessage() { } // stop ef core from complaining
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

	public ReportMessage(
		long id,
		long? authorId,
		long? recipientId,
		long? messageId,
		DateTime timeStamp,
		string content,
		ReportFlag status,
		params AttachmentInfo[] attachments)
	{
		this.Id = id;
		this.AuthorId = authorId;
		this.RecipientId = recipientId;
		this.MessageId = messageId;
		this.TimeStamp = timeStamp;
		this.Content = content;
		this.Status = status;
		this.Attachments = attachments;
	}
}
