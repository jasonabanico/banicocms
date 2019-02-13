import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PluginService } from "../../services/plugin.service";
import { ContentItem } from '../../../entities/content-item';
import { HttpHeaders } from '@angular/common/http';
import { ReplyComment } from '../entities/reply-comment';

@Injectable()
export class ReplyCommentService extends PluginService {

    public get(id: string): Observable<ReplyComment> {
        return this.contentItemService.get(id).pipe(
        map(item => {
            return new ReplyComment(item);
        }));
    }
    
    public getReplyComments(replyId: string, page: number, pageSize: number): Observable<ReplyComment[]> {
        return this.contentItemService.getAll('', '', '',
        'reply-comment', replyId, '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '', true, true, '', page, pageSize).pipe(
        map(items => {
            var replyComments: ReplyComment[] = new Array<ReplyComment>();
            items.forEach(function(item: ContentItem) {
                replyComments.push(new ReplyComment(item));                
            });

            return replyComments;
        }));
    }

    public setReplyCommentUser(replyComment: ReplyComment) {
        var user = this.contentItemService.getProfileById(replyComment.userId)
        .subscribe(user => {
            replyComment.username = user.alias;
            replyComment.avatarHash = user.attribute01;
        });
    }

    public addOrUpdate(
        id: string,
        replyId: string,
        text: string
    ): Observable<string> {
        let replyComment: ReplyComment = new ReplyComment(null);

        replyComment.id = id;
        replyComment.replyId = replyId;
        replyComment.text = text;

        let contentItem: ContentItem = replyComment.ToContentItem();
        return this.contentItemService.addOrUpdate(contentItem).pipe(
            catchError(this.handleError));
    }

    public delete(replyComment: ReplyComment): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + replyComment.id;
        return this.http
            .post(this.appBaseUrl + '/Delete', data, {
                headers: headers
            }).pipe(
            map(this.extractData));
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }
}