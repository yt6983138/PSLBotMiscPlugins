namespace AdminHelper.Models;

public class BlackListCondition
{
	public string BlockExpression { get; set; }

	public float BlockChance { get; set; }
	public DateTime ExpireDate { get; set; }

	public DateTime BlackListDate { get; set; }
	public string Description { get; set; }
	/// <summary>
	/// prefix <c>Localization:</c> is considered as localization key, otherwise considered as raw string
	/// </summary>
	public string? BlockedResponse { get; set; }

	public bool Disabled { get; set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
	private BlackListCondition() { } // ef mapper only
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

	public BlackListCondition(string description, float blockChance, string blockExpression, TimeSpan blackListDuration)
	{
		this.BlackListDate = DateTime.Now;
		this.Description = description;
		this.BlockChance = blockChance;
		this.BlockExpression = blockExpression;
		this.ExpireDate = this.BlackListDate.Add(blackListDuration);
	}
}
