using Microsoft.AspNetCore.Razor.TagHelpers;

namespace PersonalWebsite.TagHelpers;

[HtmlTargetElement("win-dialog")]
public class WinDialogTagHelper : TagHelper
{
	public bool IsOpen { get; set; } = true;
	public string DefaultClass { get; set; } = "dialog fixed-dialog is-xl";
	public string Classes { get; set; } = "";
	public string Id { get; set; } = "";

	public required string Title { get; set; }

	private string DialogClasses => $"{this.DefaultClass.TrimEnd()} {this.Classes}";

	public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
	{
		TagHelperContent content = await output.GetChildContentAsync();

		output.TagMode = TagMode.StartTagAndEndTag;
		output.TagName = "dialog";
		output.Attributes.SetAttribute("class", this.DialogClasses);
		if (!string.IsNullOrWhiteSpace(this.Id))
		{
			output.Attributes.SetAttribute("id", this.Id);
		}
		if (this.IsOpen)
		{
			output.Attributes.SetAttribute("open", "true");
		}
		output.Content.SetHtmlContent($$"""
			<div class="dialog-header">
			    <h2>{{this.Title}}</h2>
			</div>
			<div class="dialog-body">
				{{content.GetContent()}}
			</div>
			""");
	}
}
