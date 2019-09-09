import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact.routing';
import { ContactComponent }  from './components/contact.component';
import { ContactFormComponent } from './components/form/form.component';
import { ContactFormBuilderComponent } from './components/form-builder/form-builder.component';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    ContactRoutingModule
  ],
  declarations: [ 
    ContactComponent,
    ContactFormComponent,
    ContactFormBuilderComponent 
  ],
  bootstrap:    [ ContactComponent ]
})
export class ContactModule { }
