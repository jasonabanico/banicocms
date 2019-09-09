import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinksRoutingModule } from './links.routing';
import { LinksComponent } from './components/links.component';
import { LinksFormComponent } from './components/form/form.component';
import { LinksListComponent } from './components/list/list.component';
import { LinksService } from './services/links.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LinksRoutingModule
  ],
  declarations: [
    LinksComponent,
    LinksFormComponent,
    LinksListComponent
  ],
  providers: [
    LinksService
  ]
})
export class LinksModule { }
