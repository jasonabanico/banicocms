import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DirectoryRoutingModule } from './directory.routing';
import { DirectoryComponent }  from './directory.component';
import { DirectoryDisplayComponent } from '../components/directory-display/directory-display.component';
import { DirectoryItemDisplayComponent } from '../components/directory-item-display/directory-item-display.component';
import { DirectoryFormComponent } from '../components/directory-form/directory-form.component';
import { DirectorySearchComponent } from '../components/directory-search/directory-search.component';
import { DirectoryFrontComponent } from '../components/directory-front/directory-front.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    NgbModule,
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
