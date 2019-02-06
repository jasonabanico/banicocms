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

  @Output() saved: EventEmitter<string> = new EventEmitter<string>();
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
      var id = this.replyCommentForm.value['id'];
      var text = this.replyCommentForm.value['text'];
      this.replyCommentService.addOrUpdate(
        id,
        this.replyCommentForm.value['replyId'],
        text
      )
      .subscribe(
        id => {
          this.saved.emit(id);
        }
        //errors =>  this.errors = errors
      );
    }

    this.lastKeypressTime = thisKeypressTime;
  }

  public cancel() {
    this.cancelled.emit();
  }
}
