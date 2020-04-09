import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShellModule } from "../../../shell/shell.module";

import { PageRoutingModule } from "./page.routing";
import { PageComponent } from "./components/page.component";
import { PageItemComponent } from "./components/item/item.component";
import { PageFormComponent } from "./components/form/form.component";
import { PageService } from "./services/page.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShellModule,
    PageRoutingModule
  ],
  declarations: [PageComponent, PageItemComponent, PageFormComponent],
  providers: [PageService],
  bootstrap: [PageComponent]
})
export class PageModule {}
