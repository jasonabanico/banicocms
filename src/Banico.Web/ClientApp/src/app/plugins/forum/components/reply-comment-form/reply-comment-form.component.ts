import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplyCommentService } from '../../services/reply-comment.service';

@Component({
  selector: 'app-reply-comment-form',
  templateUrl: './reply-comment-form.component.html',
  styleUrls: ['./reply-comment-form.component.scss']
})
export class ReplyCommentFormComponent implements OnInit {

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

  ngOnInit() {
  }

  public save() {
    
  }
}
