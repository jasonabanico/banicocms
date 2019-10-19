import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FaqRoutingModule } from './faq.routing';
import { FaqComponent }  from './components/faq.component';
import { FaqListComponent } from './components/list/list.component';
import { FaqListFormComponent } from './components/list-form/list-form.component';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    FaqRoutingModule
  ],
  declarations: [ 
    FaqComponent,
    FaqListComponent,
    FaqListFormComponent 
  ],
  bootstrap:    [ FaqComponent ]
})
export class FaqModule { }
