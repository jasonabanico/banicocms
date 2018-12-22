import { Component, OnInit, Input } from '@angular/core';
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
  private _id: string;
  
  constructor(
    private replyService: ReplyService
    ) {
  }

  @Input()
  set id(id: string) {
    this._id = id;
    this.replyService.get(id)
    .subscribe(reply => this.reply = reply);
  }
}
