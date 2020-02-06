import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-shell-rich-text",
  templateUrl: "./rich-text.component.html"
})
export class RichTextComponent {
  public elements: string[];
  public fontFamilyStyle: string;
  public fontSizeStyle: string;
  public isEmbed: boolean[] = [];

  @Input()
  set fontFamily(fontFamily: string) {
    if (fontFamily) {
      if (fontFamily === "serif") {
        this.fontFamilyStyle =
          "'Georgia, Cambria, \"Times New Roman\", Times, serif'";
      }
      if (fontFamily === "sans-serif") {
        this.fontFamilyStyle =
          "'\"Helvetica Neue\", Helvetica, Arial, sans-serif'";
      }
    }
  }

  @Input()
  set fontSize(fontSize: string) {
    if (fontSize) {
      this.fontSizeStyle = fontSize;
    }
  }

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
