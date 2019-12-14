import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { PluginService } from "../../../services/plugin.service";
import { ContentItem } from "../../../../entities/content-item";
import { HttpHeaders } from "@angular/common/http";
import { Post } from "../entities/post";
import { ContentItemSearch } from "../../../entities/contentItemSearch";

@Injectable()
export class ForumPostService extends PluginService {
  public get(id: string): Observable<Post> {
    return this.contentItemService.get(id).pipe(
      map(item => {
        return new Post(item);
      })
    );
  }

  public getPosts(
    topicId: string,
    page: number,
    offset: number
  ): Observable<Post[]> {
    const contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "forum";
    contentItemSearch.type = "post";
    contentItemSearch.parentId = topicId;
    contentItemSearch.page = page;
    contentItemSearch.pageSize = this.pageSize;
    contentItemSearch.offset = offset;
    contentItemSearch.orderBy = "createdDate";
    return this.contentItemService.getAll(contentItemSearch).pipe(
      map(items => {
        const replies: Post[] = new Array<Post>();
        items.forEach(function(item: ContentItem) {
          replies.push(new Post(item));
        });

        return replies;
      })
    );
  }

  public setPostUser(post: Post) {
    this.contentItemService.getProfileById(post.userId).subscribe(user => {
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

    const contentItem: ContentItem = post.toContentItem();
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
