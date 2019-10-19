import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListRoutingModule } from './list.routing';
import { ListComponent } from './components/list.component';
import { ListDisplayComponent } from './components/list-display/list-display.component';
import { ListSetDisplayComponent } from './components/list-set-display/list-set-display.component';
import { ListSetFormComponent } from './components/list-set-form/list-set-form.component';
import { ListItemDisplayComponent } from './components/list-item-display/list-item-display.component';
import { ListItemFormComponent } from './components/list-item-form/list-item-form.component';
import { ListFormComponent } from './components/list-form/list-form.component';
import { ListFrontComponent } from './components/list-front/list-front.component';
import { ListSetService } from './services/list-set.service';
import { ListItemService } from './services/list-item.service';
import { ListService } from './services/list.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListRoutingModule
  ],
  declarations: [
    ListComponent,
    ListDisplayComponent,
    ListFormComponent,
    ListFrontComponent,
    ListSetFormComponent,
    ListSetDisplayComponent,
    ListItemFormComponent,
    ListItemDisplayComponent
  ],
  providers: [ 
    ListSetService,
    ListItemService,
    ListService
  ]
})
export class ListModule { }
