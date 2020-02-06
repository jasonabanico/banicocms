import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-shell-rich-text",
  templateUrl: "./rich-text.component.html"
})
export class RichTextComponent {
  public elements: string[];
  public fontFamilyStyle: any;
  public isEmbed: boolean[] = [];

  @Input()
  set fontFamily(fontFamily: string) {
    if (fontFamily === "serif") {
      fontFamily = 'Georgia, Cambria, "Times New Roman", Times, serif';
    }
    if (fontFamily === "sans-serif") {
      fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';
    }
    this.fontFamilyStyle = {
      "font-family": fontFamily
    };
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
