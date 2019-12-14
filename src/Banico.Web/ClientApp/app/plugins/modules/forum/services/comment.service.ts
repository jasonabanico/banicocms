import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { PluginService } from "../../../services/plugin.service";
import { ContentItem } from "../../../../entities/content-item";
import { HttpHeaders } from "@angular/common/http";
import { Comment } from "../entities/comment";
import { ContentItemSearch } from "../../../entities/contentItemSearch";

@Injectable()
export class ForumCommentService extends PluginService {
  public get(id: string): Observable<Comment> {
    return this.contentItemService.get(id).pipe(
      map(item => {
        return new Comment(item);
      })
    );
  }

  public getComments(
    postId: string,
    page: number,
    offset: number
  ): Observable<Comment[]> {
    const contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "forum";
    contentItemSearch.type = "comment";
    contentItemSearch.parentId = postId;
    contentItemSearch.page = page;
    contentItemSearch.pageSize = this.pageSize;
    contentItemSearch.offset = offset;
    contentItemSearch.orderBy = "createdDate";
    return this.contentItemService.getAll(contentItemSearch).pipe(
      map(items => {
        const comments: Comment[] = new Array<Comment>();
        items.forEach(function(item: ContentItem) {
          comments.push(new Comment(item));
        });

        return comments;
      })
    );
  }

  public setCommentUser(comment: Comment) {
    this.contentItemService.getProfileById(comment.userId).subscribe(user => {
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

    const contentItem: ContentItem = comment.toContentItem();
    return this.contentItemService
      .addOrUpdate(contentItem)
      .pipe(catchError(this.handleError));
  }

  public delete(id: string): Observable<string> {
    return this.contentItemService
      .delete(id)
      .pipe(catchError(this.handleError));
  }
}
