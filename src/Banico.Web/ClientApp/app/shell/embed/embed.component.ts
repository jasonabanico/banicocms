import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-shell-embed",
  templateUrl: "./embed.component.html"
})
export class EmbedComponent {
  public type: string;
  public id: string;
  public tag: string;

  constructor(public sanitizer: DomSanitizer) {}

  private embeds = [
    {
      site: "youtube",
      regex:
        "(?:https?:/{2})?(?:w{3}.)?youtu(?:be)?.(?:com|be)(?:/watch?v=|/)([^s&]+)",
      index: 1
    },
    {
      site: "imgur",
      regex:
        "(?:https?:/{2})?(?:w{3}.)?imgur.com/(gallery|a)/(.*?)(?:[#/].*|$)",
      index: 2
    },
    {
      site: "instagram",
      regex: "(?:https?:/{2})?(?:w{3}.)?instagram.com/p/(.*?)(?:[#/].*|$)",
      index: 1
    }
  ];

  @Input()
  set tagId(tagId: string) {
    tagId = tagId.replace("{{", "");
    tagId = tagId.replace("}}", "");

    for (let i = 0; i < this.embeds.length; i++) {
      const embed = this.embeds[i];
      let match = tagId.match(embed.regex);
      if (match) {
        this.tag = embed.site;
        this.id = match[embed.index];
      }
    }
  }
}
