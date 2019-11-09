import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkdownModule } from "ngx-markdown";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ForumRoutingModule } from "./forum.routing";
import { RichTextModule } from "../rich-text/rich-text.module";
import { ShellModule } from "../../../shell/shell.module";
import { ForumComponent } from "./components/forum.component";
import { ForumHomeComponent } from "./components/home/home.component";
import { ForumSubforumComponent } from "./components/subforum/subforum.component";
import { ForumSubforumFormComponent } from "./components/subforum-form/subforum-form.component";
import { ForumTopicComponent } from "./components/topic/topic.component";
import { ForumTopicFormComponent } from "./components/topic-form/topic-form.component";
import { ForumPostComponent } from "./components/post/post.component";
import { ForumPostFormComponent } from "./components/post-form/post-form.component";
import { ForumCommentComponent } from "./components/comment/comment.component";
import { ForumCommentFormComponent } from "./components/comment-form/comment-form.component";
import { ForumSubforumService } from "./services/subforum.service";
import { ForumTopicService } from "./services/topic.service";
import { ForumPostService } from "./services/post.service";
import { ForumCommentService } from "./services/comment.service";
//import { ForumStoreModule } from './store/forum-store.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ForumRoutingModule,
    MarkdownModule.forChild(),
    RichTextModule,
    ShellModule
    //ForumStoreModule
  ],
  declarations: [
    ForumComponent,
    ForumHomeComponent,
    ForumSubforumComponent,
    ForumSubforumFormComponent,
    ForumTopicComponent,
    ForumTopicFormComponent,
    ForumPostComponent,
    ForumPostFormComponent,
    ForumCommentComponent,
    ForumCommentFormComponent
  ],
  providers: [
    ForumSubforumService,
    ForumTopicService,
    ForumPostService,
    ForumCommentService
  ]
})
export class ForumModule {}
