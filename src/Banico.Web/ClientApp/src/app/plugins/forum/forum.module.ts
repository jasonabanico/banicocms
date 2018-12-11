import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ForumRoutingModule } from './forum.routing';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ForumRoutingModule
  ],
  declarations: [
  ],
  providers: [ 
  ]
})
export class ForumModule { }
