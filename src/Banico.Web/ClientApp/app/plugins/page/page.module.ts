import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageRoutingModule } from './page.routing';
import { PageComponent }  from './components/page.component';
import { PageItemComponent } from './components/item/item.component';
import { PageFormComponent } from './components/form/form.component';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    PageRoutingModule
  ],
  declarations: [ 
    PageComponent,
    PageItemComponent,
    PageFormComponent 
  ],
  bootstrap:    [ PageComponent ]
})
export class PageModule { }
