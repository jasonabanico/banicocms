import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { Comment } from "../../entities/comment";
import { ForumCommentService } from "../../services/comment.service";
import { AuthService } from "../../../../shared/services/auth.service";

@Component({
  selector: "app-plugins-forum-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.scss"]
})
export class ForumCommentComponent {
  public userId: string;
  public comment: Comment;
  private _id: string;
  public isEdit: boolean;

  constructor(
    private commentService: ForumCommentService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserId();
  }

  @Input()
  set id(id: string) {
    this._id = id;
    this.commentService.get(id).subscribe(comment => this.set(comment));
  }

  private set(comment: Comment) {
    this.comment = comment;
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
