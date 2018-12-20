import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PluginService } from "../../services/plugin.service";
import { ContentItem } from '../../../entities/content-item';
import { HttpHeaders } from '@angular/common/http';
import { Reply } from '../entities/reply';

@Injectable()
export class ReplyService extends PluginService {

    public get(id: string): Observable<Reply> {
        return this.contentItemService.get(id)
        .map(item => {
            return new Reply(item);
        });
    }
    
    public getReplies(topicId: string): Observable<Reply[]> {
        return this.contentItemService.getAll('', '', '',
        'reply', topicId, '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '', true, true)
        .map(items => {
            var replies: Reply[] = new Array<Reply>();
            items.forEach(function(item: ContentItem) {
                replies.push(new Reply(item));                
            });

            return replies;
        });
    }

    public addOrUpdate(
        id: string,
        topicId: string,
        text: string
    ): Observable<boolean> {
        let reply: Reply = new Reply(null);

        reply.id = id;
        reply.topicId = topicId;
        reply.text = text;

        let contentItem: ContentItem = reply.ToContentItem();
        return this.contentItemService.addOrUpdate(contentItem, '')
            .catch(this.handleError);
    }

    public delete(reply: Reply): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + reply.id;
        return this.http
            .post(this.appBaseUrl + '/Delete', data, {
                headers: headers
            })
            .map(this.extractData);
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }
}