import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ConfigsService } from '../../../../shared/services/configs.service';
import { ReplyService } from '../../services/reply.service';
import { ReplyCommentService } from '../../services/reply-comment.service';
import { Reply } from '../../entities/reply';
import { ReplyComment } from '../../entities/reply-comment';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent {
  public reply: Reply;
  public replyComments: ReplyComment[];
  private _id: string;
  public isEdit: boolean;
  public moment: string;
  public momentRelative: string;
  
  constructor(
    private configService: ConfigsService,
    private replyService: ReplyService,
    private replyCommentService: ReplyCommentService
    ) {
  }

  @Input()
  set id(id: string) {
    this._id = id;
    this.replyService.get(id)
    .subscribe(reply => this.set(reply));
  }

  private set(reply: Reply) {
    this.reply = reply;
    this.moment = moment(reply.createdDate).format('MMMM Do YYYY, h:mm:ss a');
    this.momentRelative = moment(reply.createdDate).fromNow();
    this.replyService.setReplyUser(reply);
    this.configService.get('', 'forums', 'pageSize')
      .pipe(
        map(config => {
          const size = config.value;
          this.replyCommentService.getReplyComments(reply.id, 0, +size)
          .subscribe(replyComments => this.replyComments = replyComments);
        })
      );
    this.isEdit = false;
  }

  public edit() {
    this.isEdit = true;
  }

  public onSave(text: string) {
    this.reply.text = text;
    this.isEdit = false;
  }

  public onCancel() {
    this.isEdit = false;
  }

  public onCommentSave(replyComment: ReplyComment) {
    this.replyCommentService.get(replyComment.id)
    .subscribe(replyComment => {
      this.replyComments.push(replyComment)
    });
  }
}
