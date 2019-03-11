import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LinksRoutingModule } from './links.routing';
import { LinksComponent } from './components/links.component';
import { LinkFormComponent } from './components/link-form/link-form.component';
import { LinkListComponent } from './components/link-list/link-list.component';
import { LinksService } from './services/links.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LinksRoutingModule
  ],
  declarations: [
    LinksComponent,
    LinkFormComponent,
    LinkListComponent
  ],
  providers: [
    LinksService
  ]
})
export class LinksModule { }
