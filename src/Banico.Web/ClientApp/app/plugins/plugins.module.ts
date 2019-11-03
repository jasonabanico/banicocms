import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ContentItemService } from "./services/content-item.service";
import { PluginsRoutingModule } from "./plugins.routing";

@NgModule({
  imports: [CommonModule, PluginsRoutingModule],
  providers: [ContentItemService]
})
export class PluginsModule {}
