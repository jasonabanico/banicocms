import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ForumRoutingModule } from './forum.routing';
import { SubforumDisplayComponent } from './components/subforum-display/subforum-display.component';
import { SubforumFormComponent } from './components/subforum-form/subforum-form.component';
import { TopicDisplayComponent } from './components/topic-display/topic-display.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ForumRoutingModule
  ],
  declarations: [
    SubforumDisplayComponent,
    SubforumFormComponent,
    TopicDisplayComponent,
    TopicFormComponent],
  providers: [ 
  ]
})
export class ForumModule { }
