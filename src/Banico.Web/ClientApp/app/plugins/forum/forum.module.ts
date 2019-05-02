import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ForumRoutingModule } from './forum.routing';
import { ForumComponent } from './components/forum.component';
import { SubforumComponent } from './components/subforum/subforum.component';
import { SubforumFormComponent } from './components/subforum-form/subforum-form.component';
import { TopicComponent } from './components/topic/topic.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { ReplyComponent } from './components/reply/reply.component';
import { ReplyFormComponent } from './components/reply-form/reply-form.component';
import { ReplyCommentComponent } from './components/reply-comment/reply-comment.component';
import { ReplyCommentFormComponent } from './components/reply-comment-form/reply-comment-form.component';
import { SubforumService } from './services/subforum.service';
import { TopicService } from './services/topic.service';
import { ReplyService } from './services/reply.service';
import { ReplyCommentService } from './services/reply-comment.service';
//import { ForumStoreModule } from './store/forum-store.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ForumRoutingModule
    //ForumStoreModule
  ],
  declarations: [
    ForumComponent,
    SubforumComponent,
    SubforumFormComponent,
    TopicComponent,
    TopicFormComponent,
    ReplyComponent,
    ReplyFormComponent,
    ReplyCommentComponent,
    ReplyCommentFormComponent
  ],
  providers: [ 
    SubforumService,
    TopicService,
    ReplyService,
    ReplyCommentService
  ]
})
export class ForumModule { }
