import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DirectoryRoutingModule } from './directory.routing';
import { DirectoryComponent }  from './components/directory.component';
import { DirectoryDisplayComponent } from './components/directory-display/directory-display.component';
import { DirectoryItemDisplayComponent } from './components/directory-item-display/directory-item-display.component';
import { DirectoryFormComponent } from './components/directory-form/directory-form.component';
import { DirectorySearchComponent } from './components/directory-search/directory-search.component';
import { DirectoryFrontComponent } from './components/directory-front/directory-front.component';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    DirectoryRoutingModule
  ],
  declarations: [ 
    DirectoryComponent,
    DirectoryDisplayComponent,
    DirectoryItemDisplayComponent,
    DirectoryFormComponent,
    DirectoryFrontComponent,
    DirectorySearchComponent
  ],
  entryComponents: [
  ]
})
export class DirectoryModule { }
