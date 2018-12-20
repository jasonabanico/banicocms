import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Reply } from '../../entities/reply';
import { ReplyService } from '../../services/reply.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent {
  public reply: Reply;
  
  constructor(
    private replyService: ReplyService
    ) {
  }
}
