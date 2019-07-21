import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Comment } from '../../entities/comment';
import { CommentService } from '../../services/comment.service';
import * as moment from 'moment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  public comment: Comment;
  private _id: string;
  public isEdit: boolean;
  public moment: string;
  public momentRelative: string;

  constructor(
    private commentService: CommentService
    ) {
  }

  @Input()
  set id(id: string) {
    this._id = id;
    this.commentService.get(id)
    .subscribe(comment => this.set(comment));
  }

  private set(comment: Comment) {
    this.comment = comment;
    this.moment = moment(comment.createdDate).format('MMMM Do YYYY, h:mm:ss a');
    this.momentRelative = moment(comment.createdDate).fromNow();
    this.commentService.setCommentUser(comment);
    this.isEdit = false;
  }

  public edit() {
    this.isEdit = true;
  }

  public onSave(comment: Comment) {
    this.set(comment);
    this.isEdit = false;
  }

  public onCancel() {
    this.isEdit = false;
  }
}
