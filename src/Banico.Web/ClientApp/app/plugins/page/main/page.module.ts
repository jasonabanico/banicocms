import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageRoutingModule } from './page.routing';
import { PageComponent }  from './page.component';
import { PageDisplayComponent } from '../components/page-display/page-display.component';
import { PageFormComponent } from '../components/page-form/page-form.component';

@NgModule({
  imports: [ 
    CommonModule,
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
