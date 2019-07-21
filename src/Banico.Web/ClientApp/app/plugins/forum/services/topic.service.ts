import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PluginService } from "../../services/plugin.service";
import { ContentItem } from '../../../entities/content-item';
import { HttpHeaders } from '@angular/common/http';
import { Topic } from '../entities/topic';

@Injectable()
export class TopicService extends PluginService {

    public get(id: string): Observable<Topic> {
        return this.contentItemService.get(id).pipe(
        map(item => {
            return new Topic(item);
        }));
    }

    public setTopicUser(topic: Topic) {
        var user = this.contentItemService.getProfileById(topic.userId)
        .subscribe(user => {
            topic.username = user.alias;
            topic.avatarHash = user.attribute01;
        });
    }

    public getTopics(subforumId: string): Observable<Topic[]> {
        return this.contentItemService.getAll('', '', '',
        'forum-topic', subforumId, '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '', true, true, '', 0, 0).pipe(
        map(items => {
            var topics: Topic[] = new Array<Topic>();
            items.forEach(item => {
                var topic = new Topic(item);

                var user = this.contentItemService.getProfileById(item.createdBy)
                    .subscribe(user => {
                        topic.username = user.alias;
                        topic.avatarHash = user.attribute01;
                        topics.push(topic);                
                    });
            });

            return topics;
        }));
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
        return this.contentItemService.addOrUpdate(contentItem).pipe(
            catchError(this.handleError));
    }

    public delete(topic: Topic): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + topic.id;
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