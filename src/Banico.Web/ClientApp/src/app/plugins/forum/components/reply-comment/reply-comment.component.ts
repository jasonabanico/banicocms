import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ReplyComment } from '../../entities/reply-comment';
import { ReplyCommentService } from '../../services/reply-comment.service';

@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.scss']
})
export class ReplyCommentComponent {
  public replyComment: ReplyComment;
  private _id: string;
  
  constructor(
    private replyCommentService: ReplyCommentService
    ) {
  }

  @Input()
  set id(id: string) {
    this._id = id;
    this.replyCommentService.get(id)
    .subscribe(replyComment => this.replyComment = replyComment);
  }
}
