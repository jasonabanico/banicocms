import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { PluginService } from "../../../services/plugin.service";
import { ContentItem } from "../../../../entities/content-item";
import { HttpHeaders } from "@angular/common/http";
import { Topic } from "../entities/topic";
import { ContentItemSearch } from "../../../entities/contentItemSearch";

@Injectable()
export class ForumTopicService extends PluginService {
  public get(id: string): Observable<Topic> {
    return this.contentItemService.get(id).pipe(
      map(item => {
        return new Topic(item);
      })
    );
  }

  public setTopicUser(topic: Topic) {
    var user = this.contentItemService
      .getProfileById(topic.userId)
      .subscribe(user => {
        topic.username = user.alias;
        topic.avatarHash = user.attribute01;
      });
  }

  public getTopics(
    subforumId: string,
    page: number,
    offset: number
  ): Observable<Topic[]> {
    const contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "forum";
    contentItemSearch.type = "topic";
    contentItemSearch.parentId = subforumId;
    contentItemSearch.page = page;
    contentItemSearch.pageSize = this.pageSize;
    contentItemSearch.offset = offset;
    contentItemSearch.orderBy = "childCount desc";
    return this.contentItemService.getAll(contentItemSearch).pipe(
      map(items => {
        var topics: Topic[] = new Array<Topic>();
        items.forEach(item => {
          var topic = new Topic(item);

          var user = this.contentItemService
            .getProfileById(item.createdBy)
            .subscribe(user => {
              topic.username = user.alias;
              topic.avatarHash = user.attribute01;
              topics.push(topic);
            });
        });

        return topics;
      })
    );
  }

  public addOrUpdate(
    id: string,
    subforumId: string,
    title: string,
    text: string
  ): Observable<boolean> {
    let topic: Topic = new Topic(null);

    topic.id = id;
    topic.subforumId = subforumId;
    topic.title = title;
    topic.text = text;

    let contentItem: ContentItem = topic.toContentItem();
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
