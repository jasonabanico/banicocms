import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ContentItemService } from "./services/content-item.service";
import { PluginsRoutingModule } from "./plugins.routing";
import { EmbedComponent } from "./components/embed.component";
import { EmbedService } from "./services/embed.service";

@NgModule({
  imports: [CommonModule, PluginsRoutingModule],
  declarations: [EmbedComponent],
  providers: [ContentItemService, EmbedService],
  exports: [EmbedComponent]
})
export class PluginsModule {}
