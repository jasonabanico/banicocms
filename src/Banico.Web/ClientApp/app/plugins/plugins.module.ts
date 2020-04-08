import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ContentItemService } from "./services/content-item.service";
import { PluginsRoutingModule } from "./plugins.routing";

@NgModule({
  imports: [CommonModule, RouterModule, PluginsRoutingModule],
  providers: [ContentItemService]
})
export class PluginsModule {}
