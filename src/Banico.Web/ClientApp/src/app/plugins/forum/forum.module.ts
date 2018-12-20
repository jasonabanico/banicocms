import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ForumRoutingModule } from './forum.routing';
import { ForumComponent } from './components/forum.component';
import { SubforumDisplayComponent } from './components/subforum-display/subforum-display.component';
import { SubforumFormComponent } from './components/subforum-form/subforum-form.component';
import { TopicDisplayComponent } from './components/topic-display/topic-display.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { ReplyComponent } from './components/reply/reply.component';
import { ReplyCommentComponent } from './components/reply-comment/reply-comment.component';
import { SubforumService } from './services/subforum.service';
import { TopicService } from './services/topic.service';
import { ReplyService } from './services/reply.service';
import { ReplyCommentService } from './services/reply-comment.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ForumRoutingModule
  ],
  declarations: [
    ForumComponent,
    SubforumDisplayComponent,
    SubforumFormComponent,
    TopicDisplayComponent,
    TopicFormComponent,
    ReplyComponent,
    ReplyCommentComponent
  ],
  providers: [ 
    SubforumService,
    TopicService,
    ReplyService,
    ReplyCommentService
  ]
})
export class ForumModule { }
