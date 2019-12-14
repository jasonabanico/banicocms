import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { ForumPostService } from "../../services/post.service";
import { ForumCommentService } from "../../services/comment.service";
import { Post } from "../../entities/post";
import { Comment } from "../../entities/comment";
import { map } from "rxjs/operators";
import { AuthService } from "../../../../../shared/services/auth.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-plugins-forum-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class ForumPostComponent implements OnInit {
  public userId: string;
  public isAdmin: boolean;
  public post: Post;
  public comments: Comment[];
  public hasMorePages: boolean;
  public page: number = 0;
  public offset: number = 0;
  private _id: string;
  public isEdit: boolean;
  public textChanged: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private postService: ForumPostService,
    private commentService: ForumCommentService,
    private authService: AuthService
  ) {
    this.userId = authService.getUserId();
    this.isAdmin = authService.isAdmin();
  }

  @ViewChild("deleteModal", { static: false }) deleteModal;

  @Input()
  set id(id: string) {
    this._id = id;
    this.postService.get(id).subscribe(post => this.set(post));
  }

  @Input()
  set newPost(post: Post) {
    this.set(post);
  }

  @Output() deleted: EventEmitter<Post> = new EventEmitter<Post>();

  ngOnInit() {
    this.commentService.setPageSize(10);
  }

  private set(post: Post) {
    this.post = post;

    if (post.commentCount > 0) {
      this.page = Math.floor(post.commentCount / this.commentService.pageSize);
      this.offset = post.commentCount % this.commentService.pageSize;
      if (this.page > 0 && this.offset === 0) {
        this.page -= 1;
      }
      this.commentService
        .getComments(post.id, this.page, this.offset)
        .subscribe(comments => (this.comments = comments));
    }
    this.postService.setPostUser(post);
    this.isEdit = false;
  }

  public edit() {
    this.isEdit = true;
  }

  public onSave(post: Post) {
    this.set(post);
    this.textChanged.next(post.text);
    this.isEdit = false;
  }

  public onCancel() {
    this.isEdit = false;
  }

  delete() {
    this.deleteModal.show();
  }

  public deleteConfirmed() {
    this.postService.delete(this.post.id).subscribe(id => {
      if (id === this.post.id) this.deleted.emit(this.post);
    });
  }

  public onCommentSave(comment: Comment) {
    this.commentService.get(comment.id).subscribe(comment => {
      if (!this.comments) {
        this.comments = new Array<Comment>();
      }
      this.comments.push(comment);
      this.post.commentCount += 1;
    });
  }

  public moreComments() {
    if (this.page > 0) {
      this.page--;
      this.commentService
        .getComments(this.post.id, this.page, this.offset)
        .subscribe(comments => {
          this.comments.forEach(function(comment) {
            comments.push(comment);
          });
          this.comments = comments.sort(
            (a, b) => a.createdDateTicks - b.createdDateTicks
          );
        });
    }
  }

  public removeComment(id: string) {
    this.comments = this.comments.filter(comment => comment.id !== id);
    this.post.commentCount -= 1;
  }
}
