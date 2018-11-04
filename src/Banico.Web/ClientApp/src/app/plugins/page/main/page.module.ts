import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { PageRoutingModule } from './page.routing';
import { PageComponent }  from './page.component';
import { PageDisplayComponent } from '../components/page-display/page-display.component';
import { PageFormComponent } from '../components/page-form/page-form.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    PageRoutingModule
  ],
  declarations: [ 
    PageComponent,
    PageDisplayComponent,
    PageFormComponent 
  ],
  bootstrap:    [ PageComponent ]
})
export class PageModule { }
