import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RichTextModule } from "../rich-text/rich-text.module";
import { PageRoutingModule } from "./page.routing";
import { PageComponent } from "./components/page.component";
import { PageItemComponent } from "./components/item/item.component";
import { PageFormComponent } from "./components/form/form.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageRoutingModule,
    RichTextModule
  ],
  declarations: [PageComponent, PageItemComponent, PageFormComponent],
  bootstrap: [PageComponent]
})
export class PageModule {}
