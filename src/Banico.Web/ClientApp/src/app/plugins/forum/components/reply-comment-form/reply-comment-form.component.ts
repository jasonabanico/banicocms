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

  @Output() saved: EventEmitter<string> = new EventEmitter<string>();
  @Output() cancelled: EventEmitter<null> = new EventEmitter<null>();

  ngOnInit() {
  }

  private set(replyComment: ReplyComment) {
    this.replyCommentForm.patchValue({
      id: replyComment.id,
      replyId: replyComment.replyId,
      text: replyComment.text
    });
    this.isEdit = true;
  }

  public save() {
    var id = this.replyCommentForm.value['id'];
    var text = this.replyCommentForm.value['text'];
    this.replyCommentService.addOrUpdate(
      id,
      this.replyCommentForm.value['replyId'],
      text
    )
    .subscribe(
      id => {
        this.saved.emit(text);
      }
      //errors =>  this.errors = errors
    );
  }

  public cancel() {
    this.cancelled.emit();
  }
}
