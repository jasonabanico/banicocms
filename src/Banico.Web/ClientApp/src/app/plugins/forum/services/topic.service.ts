import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PluginService } from "../../services/plugin.service";
import { ContentItem } from '../../../entities/content-item';
import { HttpHeaders } from '@angular/common/http';
import { Topic } from '../entities/topic';

@Injectable()
export class TopicService extends PluginService {

    public get(id: string): Observable<Topic> {
        return this.contentItemService.get(id)
        .map(item => {
            return new Topic(item);
        });
    }
    
    public getTopics(subforumId: string): Observable<Topic[]> {
        return this.contentItemService.getAll('', '', '',
        'topic', subforumId, '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '', true, true)
        .map(items => {
            var topics: Topic[] = new Array<Topic>();
            items.forEach(function(item: ContentItem) {
                topics.push(new Topic(item));                
            });

            return topics;
        });
    }

    public addOrUpdate(
        id: string,
        subforumId: string,
        title: string,
        text: string
    ): Observable<boolean> {
        let topic: Topic = new Topic(null);

        topic.id = id;
        topic.subForumId = subforumId;
        topic.title = title;
        topic.text = text;

        let contentItem: ContentItem = topic.ToContentItem();
        return this.contentItemService.addOrUpdate(contentItem, '')
            .map(res => {
                return true;
            })
            .catch(this.handleError);
    }

    public delete(topic: Topic): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + topic.id;
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