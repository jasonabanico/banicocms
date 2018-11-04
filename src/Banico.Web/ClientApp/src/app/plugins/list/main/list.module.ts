import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ListRoutingModule } from './list.routing';
import { ListComponent } from './list.component';
import { ListDisplayComponent } from '../components/list-display/list-display.component';
import { ListItemDisplayComponent } from '../components/list-item-display/list-item-display.component';
import { ListItemFormComponent } from '../components/list-item-form/list-item-form.component';
import { ListFormComponent } from '../components/list-form/list-form.component';
import { ListFrontComponent } from '../components/list-front/list-front.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ListRoutingModule
  ],
  declarations: [
    ListComponent,
    ListDisplayComponent,
    ListFormComponent,
    ListFrontComponent,
    ListItemFormComponent,
    ListItemDisplayComponent
  ]
})
export class ListModule { }
