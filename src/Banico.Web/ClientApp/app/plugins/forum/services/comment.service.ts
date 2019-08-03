import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PluginService } from '../../services/plugin.service';
import { ContentItem } from '../../../entities/content-item';
import { HttpHeaders } from '@angular/common/http';
import { Comment } from '../entities/comment';

@Injectable()
export class CommentService extends PluginService {
    public get(id: string): Observable<Comment> {
        return this.contentItemService.get(id).pipe(
        map(item => {
            return new Comment(item);
        }));
    }

    public getCommentsCount(postId: string): Observable<number> {
        return this.contentItemService.getCount('', '', '',
        'forum-comment', postId, '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '', true, true);
    }

    public getComments(postId: string, page: number): Observable<Comment[]> {
        return this.contentItemService.getAll('', '', '',
        'forum-comment', postId, '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '', true, true, '', page, this.pageSize).pipe(
        map(items => {
            const comments: Comment[] = new Array<Comment>();
            items.forEach(function(item: ContentItem) {
                comments.push(new Comment(item));
            });

            return comments;
        }));
    }

    public setCommentUser(comment: Comment) {
        this.contentItemService.getProfileById(comment.userId)
        .subscribe(user => {
            comment.username = user.alias;
            comment.avatarHash = user.attribute01;
        });
    }

    public addOrUpdate(
        id: string,
        postId: string,
        text: string
    ): Observable<string> {
        const comment: Comment = new Comment(null);

        comment.id = id;
        comment.postId = postId;
        comment.text = text;

        const contentItem: ContentItem = comment.ToContentItem();
        return this.contentItemService.addOrUpdate(contentItem).pipe(
            catchError(this.handleError));
    }

    public delete(comment: Comment): Observable<{}> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const data = 'id=' + comment.id;
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