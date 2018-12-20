import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplyService } from '../../services/reply.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

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

}
