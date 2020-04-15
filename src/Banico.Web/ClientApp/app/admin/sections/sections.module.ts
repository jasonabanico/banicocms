import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { AdminSectionsSectionComponent } from "./components/section/section.component";
import { AdminSectionsSectionItemComponent } from "./components/section-item/section-item.component";

import { SectionsFileService } from "./services/sections-file.service";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [
    AdminSectionsSectionComponent,
    AdminSectionsSectionItemComponent
  ],
  providers: [SectionsFileService]
})
export class AdminSectionsModule {}
