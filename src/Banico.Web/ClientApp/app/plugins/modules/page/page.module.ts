import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShellModule } from "../../../shell/shell.module";

import { PageRoutingModule } from "./page.routing";
import { PageComponent } from "./components/page.component";
import { PageItemComponent } from "./components/item/item.component";
import { PageFormComponent } from "./components/form/form.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShellModule,
    PageRoutingModule
  ],
  declarations: [PageComponent, PageItemComponent, PageFormComponent],
  bootstrap: [PageComponent]
})
export class PageModule {}
