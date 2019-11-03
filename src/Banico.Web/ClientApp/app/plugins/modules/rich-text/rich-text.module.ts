import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkdownModule } from "ngx-markdown";
import { EmbedComponent } from "./components/embed/embed.component";
import { RichTextComponent } from "./components/rich-text/rich-text.component";

@NgModule({
  imports: [CommonModule, MarkdownModule.forChild()],
  declarations: [EmbedComponent, RichTextComponent],
  exports: [RichTextComponent]
})
export class RichTextModule {}
