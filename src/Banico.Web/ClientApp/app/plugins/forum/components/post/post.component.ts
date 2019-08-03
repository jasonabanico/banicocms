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
export class PostComponent implements OnInit {
  public post: Post;
  public commentsCount: number;
  public comments: Comment[];
  public hasMorePages: boolean;
  public page: number = 0;
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

  ngOnInit() {
    this.commentService.setPageSize(10);
  }

  private set(post: Post) {
    this.post = post;
    this.moment = moment(post.createdDate).format('MMMM Do YYYY, h:mm:ss a');
    this.momentRelative = moment(post.createdDate).fromNow();
    this.commentService.getCommentsCount(post.id)
      .subscribe(commentsCount => {
        this.commentsCount = commentsCount;
        this.page = Math.floor(this.commentsCount / this.commentService.pageSize);
        this.commentService.getComments(post.id, this.page)
          .subscribe(comments => this.comments = comments);
      });
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

  public moreComments() {
    if (this.page > 0) {
      this.page--;
      this.commentService.getComments(this.post.id, this.page)
        .subscribe(comments => {
          this.comments.forEach(function (comment) {
            comments.push(comment);
          });
          this.comments = comments;
        });
    }
  }
}