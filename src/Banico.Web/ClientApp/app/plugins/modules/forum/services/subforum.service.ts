import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { PluginService } from "../../../services/plugin.service";
import { ContentItem } from "../../../../entities/content-item";
import { HttpHeaders } from "@angular/common/http";
import { Subforum } from "../entities/subforum";
import { ContentItemSearch } from "../../../entities/contentItemSearch";

@Injectable()
export class ForumSubforumService extends PluginService {
  public getAll(): Observable<Subforum[]> {
    const contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "forum";
    contentItemSearch.type = "subforum";
    return this.contentItemService.getAll(contentItemSearch).pipe(
      map(items => {
        const replies: Subforum[] = new Array<Subforum>();
        items.forEach(function(item: ContentItem) {
          replies.push(new Subforum(item));
        });

        return replies;
      })
    );
  }

  public getBySectionItems(sectionItems: string): Observable<Subforum[]> {
    const contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "forum";
    contentItemSearch.type = "subforum";
    contentItemSearch.sectionItems = sectionItems;
    return this.contentItemService.getAll(contentItemSearch).pipe(
      map(items => {
        const replies: Subforum[] = new Array<Subforum>();
        items.forEach(function(item: ContentItem) {
          replies.push(new Subforum(item));
        });

        return replies;
      })
    );
  }

  public get(id: string): Observable<Subforum> {
    return this.contentItemService.get(id).pipe(
      map(item => {
        return new Subforum(item);
      })
    );
  }

  public getByAliasAndSection(
    alias: string,
    sectionItems: string
  ): Observable<Subforum> {
    return this.contentItemService
      .getByAliasAndSection("forum", "subforum", alias, sectionItems)
      .pipe(
        map(item => {
          return new Subforum(item);
        })
      );
  }

  public setSubforumUser(subforum: Subforum) {
    this.contentItemService.getProfileById(subforum.userId).subscribe(user => {
      subforum.username = user.alias;
      subforum.avatarHash = user.attribute01;
    });
  }

  public addOrUpdate(
    id: string,
    name: string,
    alias: string,
    description: string,
    sectionItems: string
  ): Observable<boolean> {
    let subforum: Subforum = new Subforum(null);

    subforum.id = id;
    subforum.name = name;
    subforum.alias = alias;
    subforum.description = description;
    subforum.sectionItems = sectionItems;

    let contentItem: ContentItem = subforum.toContentItem();
    return this.contentItemService.addOrUpdate(contentItem).pipe(
      map(res => {
        return true;
      }),
      catchError(this.handleError)
    );
  }

  public delete(id: string): Observable<string> {
    return this.contentItemService
      .delete(id)
      .pipe(catchError(this.handleError));
  }
}
