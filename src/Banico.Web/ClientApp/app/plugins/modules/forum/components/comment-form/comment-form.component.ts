import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ForumCommentService } from "../../services/comment.service";
import { Comment } from "../../entities/comment";
import { AccountService } from "../../../../../identity/account/services/account.service";
import { AuthService } from "../../../../../shared/services/auth.service";

@Component({
  selector: "app-plugins-forum-comment-form",
  templateUrl: "./comment-form.component.html",
  styleUrls: ["./comment-form.component.scss"]
})
export class ForumCommentFormComponent implements OnInit {
  public isEdit: boolean = false;
  private delta = 500;
  private lastKeypressTime = 0;
  public avatarHash: string;

  public commentForm: FormGroup = this.fb.group({
    id: ["", Validators.required],
    postId: ["", Validators.required],
    userId: ["", Validators.required],
    username: ["", Validators.required],
    avatarHash: ["", Validators.required],
    createdDate: ["", Validators.required],
    text: ["", Validators.required]
  });

  constructor(
    private commentService: ForumCommentService,
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.avatarHash = this.authService.getAvatarHash();
    this.commentForm.patchValue({
      avatarHash: this.avatarHash
    });
  }

  @Input()
  set postId(postId: string) {
    this.commentForm.patchValue({
      postId: postId
    });
  }

  @Input()
  set id(id: string) {
    this.commentService.get(id).subscribe(comment => this.set(comment));
  }

  @Input()
  set text(text: string) {
    this.commentForm.patchValue({
      text: text
    });
  }

  @Input()
  set userId(userId: string) {
    this.commentForm.patchValue({
      userId: userId
    });
  }

  @Input()
  set username(username: string) {
    this.commentForm.patchValue({
      username: username
    });
  }

  @Input()
  set createdDate(createdDate: string) {
    this.commentForm.patchValue({
      createdDate: createdDate
    });
  }

  @Output() saved: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Output() cancelled: EventEmitter<null> = new EventEmitter<null>();

  ngOnInit() {}

  private set(comment: Comment) {
    this.commentForm.patchValue({
      id: comment.id,
      postId: comment.postId
    });
    this.isEdit = true;
  }

  public save() {
    var thisKeypressTime: any = new Date();
    if (thisKeypressTime - this.lastKeypressTime <= this.delta) {
      var comment: Comment = new Comment(null);
      comment.id = this.commentForm.value["id"];
      comment.text = this.commentForm.value["text"];
      comment.postId = this.commentForm.value["postId"];
      comment.userId = this.commentForm.value["userId"];
      comment.username = this.commentForm.value["username"];
      comment.avatarHash = this.commentForm.value["avatarHash"];
      comment.createdDate = this.commentForm.value["createdDate"];

      this.commentService
        .addOrUpdate(comment.id, this.commentForm.value["postId"], comment.text)
        .subscribe(
          id => {
            comment.id = id;
            this.saved.emit(comment);
          }
          //errors =>  this.errors = errors
        );
      this.commentForm.patchValue({
        text: ""
      });
    }

    this.lastKeypressTime = thisKeypressTime;
  }

  public cancel() {
    this.cancelled.emit();
  }
}
