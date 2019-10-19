import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PluginService } from '../../../services/plugin.service';
import { ContentItem } from '../../../../entities/content-item';
import { HttpHeaders } from '@angular/common/http';
import { Post } from '../entities/post';
import { ContentItemSearch } from '../../../entities/contentItemSearch';

@Injectable()
export class ForumPostService extends PluginService {

    public get(id: string): Observable<Post> {
        return this.contentItemService.get(id).pipe(
            map(item => {
                return new Post(item);
            }));
    }

    public getPosts(topicId: string, page: number, offset: number): Observable<Post[]> {
        const contentItemSearch = new ContentItemSearch();
        contentItemSearch.module = 'forum-post';
        contentItemSearch.parentId = topicId;
        contentItemSearch.page = page;
        contentItemSearch.pageSize = this.pageSize;
        contentItemSearch.offset = offset;
        return this.contentItemService.getAll(contentItemSearch).pipe(
            map(items => {
                const replies: Post[] = new Array<Post>();
                items.forEach(function (item: ContentItem) {
                    replies.push(new Post(item));
                });

                return replies;
            }));
    }

    public setPostUser(post: Post) {
        this.contentItemService.getProfileById(post.userId)
            .subscribe(user => {
                post.username = user.alias;
                post.avatarHash = user.attribute01;
            });
    }

    public addOrUpdate(
        id: string,
        topicId: string,
        text: string
    ): Observable<string> {
        const post: Post = new Post(null);

        post.id = id;
        post.topicId = topicId;
        post.text = text;

        const contentItem: ContentItem = post.ToContentItem();
        return this.contentItemService.addOrUpdate(contentItem).pipe(
            catchError(this.handleError));
    }

    public delete(post: Post): Observable<{}> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const data = 'id=' + post.id;
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