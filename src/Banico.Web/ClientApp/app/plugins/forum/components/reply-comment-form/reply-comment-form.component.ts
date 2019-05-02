import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplyCommentService } from '../../services/reply-comment.service';
import { ReplyComment } from '../../entities/reply-comment';

@Component({
  selector: 'app-reply-comment-form',
  templateUrl: './reply-comment-form.component.html',
  styleUrls: ['./reply-comment-form.component.scss']
})
export class ReplyCommentFormComponent implements OnInit {
  public isEdit: boolean = false;
  private delta = 500;
  private lastKeypressTime = 0;
  
  public replyCommentForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    replyId: ['', Validators.required],
    userId: ['', Validators.required],
    username: ['', Validators.required],
    avatarHash: ['', Validators.required],
    createdDate: ['', Validators.required],
    text: ['', Validators.required]
  });

  constructor(
    private replyCommentService: ReplyCommentService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  @Input()
  set replyId(replyId: string) {
    this.replyCommentForm.patchValue({
      replyId: replyId
    });
  }

  @Input()
  set id(id: string) {
    this.replyCommentService.get(id)
    .subscribe(replyComment => this.set(replyComment));
  }

  @Input()
  set text(text: string) {
    this.replyCommentForm.patchValue({
      text: text
    });
  }

  @Input()
  set userId(userId: string) {
    this.replyCommentForm.patchValue({
      userId: userId
    });
  }

  @Input()
  set username(username: string) {
    this.replyCommentForm.patchValue({
      username: username
    });
  }

  @Input()
  set avatarHash(avatarHash: string) {
    this.replyCommentForm.patchValue({
      avatarHash: avatarHash
    });
  }

  @Input()
  set createdDate(createdDate: string) {
    this.replyCommentForm.patchValue({
      createdDate: createdDate
    });
  }

  @Output() saved: EventEmitter<ReplyComment> = new EventEmitter<ReplyComment>();
  @Output() cancelled: EventEmitter<null> = new EventEmitter<null>();

  ngOnInit() {
  }

  private set(replyComment: ReplyComment) {
    this.replyCommentForm.patchValue({
      id: replyComment.id,
      replyId: replyComment.replyId
    });
    this.isEdit = true;
  }

  public save() {
    var thisKeypressTime: any = new Date();
    if ( thisKeypressTime - this.lastKeypressTime <= this.delta )
    {
      var replyComment: ReplyComment = new ReplyComment(null);
      replyComment.id = this.replyCommentForm.value['id'];
      replyComment.text = this.replyCommentForm.value['text'];
      replyComment.replyId = this.replyCommentForm.value['replyId'];
      replyComment.userId = this.replyCommentForm.value['userId'];
      replyComment.username = this.replyCommentForm.value['username'];
      replyComment.avatarHash = this.replyCommentForm.value['avatarHash'];
      replyComment.createdDate = this.replyCommentForm.value['createdDate'];
    
      this.replyCommentService.addOrUpdate(
        replyComment.id,
        this.replyCommentForm.value['replyId'],
        replyComment.text
      )
      .subscribe(
        id => {
          replyComment.id = id;
          this.saved.emit(replyComment);          
        }
        //errors =>  this.errors = errors
      );
      this.replyCommentForm.patchValue({
        text: ''
      });
    }

    this.lastKeypressTime = thisKeypressTime;
  }

  public cancel() {
    this.cancelled.emit();
  }
}
