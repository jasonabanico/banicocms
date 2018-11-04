import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { FaqRoutingModule } from './faq.routing';
import { FaqComponent }  from './faq.component';
import { FaqDisplayComponent } from '../components/faq-display/faq-display.component';
import { FaqFormComponent } from '../components/faq-form/faq-form.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    FaqRoutingModule
  ],
  declarations: [ 
    FaqComponent,
    FaqDisplayComponent,
    FaqFormComponent 
  ],
  bootstrap:    [ FaqComponent ]
})
export class FaqModule { }
