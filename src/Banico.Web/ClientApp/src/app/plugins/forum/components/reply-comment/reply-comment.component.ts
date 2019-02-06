import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ReplyComment } from '../../entities/reply-comment';
import { ReplyCommentService } from '../../services/reply-comment.service';
import * as moment from 'moment';

@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.scss']
})
export class ReplyCommentComponent {
  public replyComment: ReplyComment;
  private _id: string;
  public isEdit: boolean;
  public moment: string;
  public momentRelative: string;

  constructor(
    private replyCommentService: ReplyCommentService
    ) {
  }

  @Input()
  set id(id: string) {
    this._id = id;
    this.replyCommentService.get(id)
    .subscribe(replyComment => this.set(replyComment));
  }

  private set(replyComment: ReplyComment) {
    this.replyComment = replyComment;
    this.moment = moment(replyComment.createdDate).format('MMMM Do YYYY, h:mm:ss a');
    this.momentRelative = moment(replyComment.createdDate).fromNow();
    this.replyCommentService.setReplyCommentUser(replyComment);
    this.isEdit = false;
  }

  public edit() {
    this.isEdit = true;
  }

  public onSave(replyComment: ReplyComment) {
    this.set(replyComment);
    this.isEdit = false;
  }

  public onCancel() {
    this.isEdit = false;
  }
}
