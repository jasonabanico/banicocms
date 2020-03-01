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

  @Input()
  set tagId(tagId: string) {
    tagId = tagId.replace("{{", "");
    tagId = tagId.replace("}}", "");
    const values = tagId.split(":");
    this.tag = values[0];
    this.id = values[1];
    alert(this.type);
    alert(this.tag);
    alert(this.id);
  }
}
