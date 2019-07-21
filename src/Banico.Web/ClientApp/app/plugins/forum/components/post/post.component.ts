import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { Post } from '../../entities/post';
import { Comment } from '../../entities/comment';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  public post: Post;
  public comments: Comment[];
  private _id: string;
  public isEdit: boolean;
  public moment: string;
  public momentRelative: string;

  constructor(
    private postService: PostService,
    private commentService: CommentService
    ) {
  }

  @Input()
  set id(id: string) {
    this._id = id;
    this.postService.get(id)
    .subscribe(post => this.set(post));
  }

  private set(post: Post) {
    this.post = post;
    this.moment = moment(post.createdDate).format('MMMM Do YYYY, h:mm:ss a');
    this.momentRelative = moment(post.createdDate).fromNow();
    this.commentService.getComments(post.id, 0)
      .subscribe(comments => this.comments = comments);
    this.postService.setPostUser(post);
    this.isEdit = false;
  }

  public edit() {
    this.isEdit = true;
  }

  public onSave(text: string) {
    this.post.text = text;
    this.isEdit = false;
  }

  public onCancel() {
    this.isEdit = false;
  }

  public onCommentSave(comment: Comment) {
    this.commentService.get(comment.id)
    .subscribe(comment => {
      this.comments.push(comment)
    });
  }
}
