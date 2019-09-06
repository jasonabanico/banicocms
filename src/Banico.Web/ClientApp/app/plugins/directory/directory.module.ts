import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DirectoryRoutingModule } from './directory.routing';
import { DirectoryComponent }  from './components/directory.component';
import { DirectoryListComponent } from './components/list/list.component';
import { DirectoryItemComponent } from './components/item/item.component';
import { DirectoryItemFormComponent } from './components/item-form/item-form.component';
import { DirectorySearchComponent } from './components/search/search.component';
import { DirectoryHomeComponent } from './components/home/home.component';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    DirectoryRoutingModule
  ],
  declarations: [ 
    DirectoryComponent,
    DirectoryListComponent,
    DirectoryItemComponent,
    DirectoryItemFormComponent,
    DirectoryHomeComponent,
    DirectorySearchComponent
  ],
  entryComponents: [
  ]
})
export class DirectoryModule { }
