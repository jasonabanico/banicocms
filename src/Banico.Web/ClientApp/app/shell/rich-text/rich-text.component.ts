import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-plugins-rich-text",
  templateUrl: "./rich-text.component.html"
})
export class RichTextComponent {
  public elements: string[];
  public isEmbed: boolean[] = [];

  @Input()
  set text(text: string) {
    if (text) {
      this.elements = text.split(/(\{\{.*?\}\})/g);
      this.elements.forEach(element => {
        let regex = /\{\{.*?\}\}/g;
        this.isEmbed.push(regex.test(element));
      });
    }
  }
}
