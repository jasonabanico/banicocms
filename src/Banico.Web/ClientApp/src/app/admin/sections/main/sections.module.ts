import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SectionsAdminComponent } from '../components/sections-admin/sections-admin.component';
import { SectionItemsAdminComponent } from '../components/section-items-admin/section-items-admin.component';

import { SectionsService } from './services/sections.service';
import { SectionsFileService } from './services/sections-file.service';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ 
    SectionsAdminComponent,
    SectionItemsAdminComponent 
   ],
   providers: [
     SectionsService,
     SectionsFileService
   ]   
})
export class SectionsModule { }
