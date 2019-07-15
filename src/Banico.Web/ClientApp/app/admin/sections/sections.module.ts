import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SectionsAdminComponent } from './components/sections-admin/sections-admin.component';
import { SectionItemsAdminComponent } from './components/section-items-admin/section-items-admin.component';

import { SectionsFileService } from './services/sections-file.service';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ 
    SectionsAdminComponent,
    SectionItemsAdminComponent 
   ],
   providers: [
     SectionsFileService
   ]   
})
export class SectionsModule { }
