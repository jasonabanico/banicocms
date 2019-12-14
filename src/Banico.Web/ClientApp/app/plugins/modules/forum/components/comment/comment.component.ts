import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { AuthService } from "../../../../../shared/services/auth.service";
import { ModalComponent } from "../../../../../shell/modal/modal.component";
import { Comment } from "../../entities/comment";
import { ForumCommentService } from "../../services/comment.service";

@Component({
  selector: "app-plugins-forum-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.scss"]
})
export class ForumCommentComponent {
  public userId: string;
  public isAdmin: boolean;
  public comment: Comment;
  private _id: string;
  public isEdit: boolean;

  constructor(
    private commentService: ForumCommentService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserId();
    this.isAdmin = this.authService.isAdmin();
  }

  @ViewChild("deleteModal", { static: false }) deleteModal;

  @Input()
  set id(id: string) {
    this._id = id;
    this.commentService.get(id).subscribe(comment => this.set(comment));
  }

  @Output() deleted: EventEmitter<Comment> = new EventEmitter<Comment>();

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

  delete() {
    this.deleteModal.show();
  }

  public deleteConfirmed() {
    this.commentService.delete(this.comment.id).subscribe(id => {
      if (id === this.comment.id) this.deleted.emit(this.comment);
    });
  }
}
