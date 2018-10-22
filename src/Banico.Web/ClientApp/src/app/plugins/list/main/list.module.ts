import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ListRoutingModule } from './list.routing';
import { ListComponent } from './list.component';
import { ListDisplayComponent } from '../components/listdisplay/listdisplay.component';
import { ListItemDisplayComponent } from '../components/listitemdisplay/listitemdisplay.component';
import { ListItemFormComponent } from '../components/listitemform/listitemform.component';
import { ListFormComponent } from '../components/listform/listform.component';
import { ListFrontComponent } from '../components/listfront/listfront.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
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
