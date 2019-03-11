import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PluginService } from '../../services/plugin.service';
import { ContentItem } from '../../../entities/content-item';
import { HttpHeaders } from '@angular/common/http';
import { Reply } from '../entities/reply';

@Injectable()
export class ReplyService extends PluginService {

    public get(id: string): Observable<Reply> {
        return this.contentItemService.get(id).pipe(
        map(item => {
            return new Reply(item);
        }));
    }

    public getReplies(topicId: string, page: number, pageSize: number): Observable<Reply[]> {
        return this.contentItemService.getAll('', '', '',
        'reply', topicId, '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '', true, true, '', page, pageSize).pipe(
        map(items => {
            const replies: Reply[] = new Array<Reply>();
            items.forEach(function(item: ContentItem) {
                replies.push(new Reply(item));
            });

            return replies;
        }));
    }

    public setReplyUser(reply: Reply) {
        this.contentItemService.getProfileById(reply.userId)
        .subscribe(user => {
            reply.username = user.alias;
            reply.avatarHash = user.attribute01;
        });
    }

    public addOrUpdate(
        id: string,
        topicId: string,
        text: string
    ): Observable<string> {
        const reply: Reply = new Reply(null);

        reply.id = id;
        reply.topicId = topicId;
        reply.text = text;

        const contentItem: ContentItem = reply.ToContentItem();
        return this.contentItemService.addOrUpdate(contentItem).pipe(
            catchError(this.handleError));
    }

    public delete(reply: Reply): Observable<{}> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const data = 'id=' + reply.id;
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