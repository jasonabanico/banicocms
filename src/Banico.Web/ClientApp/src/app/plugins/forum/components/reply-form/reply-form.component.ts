import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplyService } from '../../services/reply.service';
import { Reply } from '../../entities/reply';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.scss']
})
export class ReplyFormComponent implements OnInit {
  public isEdit: boolean = false;

  public replyForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    topicId: ['', Validators.required],
    text: ['', Validators.required]
  });

  constructor(
    private replyService: ReplyService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit() {
  }

  @Input()
  set topicId(topicId: string) {
    this.replyForm.patchValue({
      topicId: topicId
    });
  }

  @Input()
  set id(id: string) {
    this.replyService.get(id)
    .subscribe(reply => this.set(reply));
  }

  @Output() saved: EventEmitter<string> = new EventEmitter<string>();
  @Output() cancelled: EventEmitter<null> = new EventEmitter<null>();

  private set(reply: Reply) {
    this.replyForm.patchValue({
      id: reply.id,
      topicId: reply.topicId,
      text: reply.text
    });
    this.isEdit = true;
  }

  public save() {
    // this.isRequesting = true;
    var id = this.replyForm.value['id'];
    var text = this.replyForm.value['text'];
    this.replyService.addOrUpdate(
      id,
      this.replyForm.value['topicId'],
      text
    )
    .subscribe(
      id => {
        this.saved.emit(text);
      }
      //errors =>  //this.errors = errors
    );
  }

  public cancel() {
    this.cancelled.emit();
  }
}
