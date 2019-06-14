import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SectionsAdminComponent } from '../components/sections-admin/sections-admin.component';
import { SectionItemsAdminComponent } from '../components/section-items-admin/section-items-admin.component';

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
     SectionsFileService
   ]   
})
export class SectionsModule { }
