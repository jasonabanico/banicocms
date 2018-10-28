import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SectionsAdminComponent } from '../components/sectionsadmin/sectionsadmin.component';
import { SectionItemsAdminComponent } from '../components/sectionitemsadmin/sectionitemsadmin.component';

import { SectionsService } from './services/sections.service';
import { SectionsFileService } from './services/sectionsfile.service';

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
