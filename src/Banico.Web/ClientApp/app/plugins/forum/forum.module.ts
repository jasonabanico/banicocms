import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForumRoutingModule } from './forum.routing';
import { ForumComponent } from './components/forum.component';
import { SubforumComponent } from './components/subforum/subforum.component';
import { SubforumFormComponent } from './components/subforum-form/subforum-form.component';
import { TopicComponent } from './components/topic/topic.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { PostComponent } from './components/post/post.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { SubforumService } from './services/subforum.service';
import { TopicService } from './services/topic.service';
import { PostService } from './services/post.service';
import { CommentService } from './services/comment.service';
//import { ForumStoreModule } from './store/forum-store.module';

@NgModule({
  imports: [
    CommonModule,
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
    PostComponent,
    PostFormComponent,
    CommentComponent,
    CommentFormComponent
  ],
  providers: [ 
    SubforumService,
    TopicService,
    PostService,
    CommentService
  ]
})
export class ForumModule { }
