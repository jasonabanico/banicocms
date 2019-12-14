import { throwError as observableThrowError, Observable } from "rxjs";
import { Injectable, Inject } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpRequest
} from "@angular/common/http";
import { Apollo } from "apollo-angular";
import { map } from "rxjs/operators";

import {
  ContentItemsQuery,
  ContentItemsCountQuery
} from "./content-item.queries";
import {
  AddOrUpdateContentItemMutation,
  DeleteContentItemMutation
} from "./content-item.mutations";
import { ContentItemsQueryResult } from "./content-item.queryresults";
import { ContentItem } from "../../entities/content-item";
import { ContentItemsCountQueryResult } from "./content-items-count-query-result";
import { ContentItemSearch } from "../entities/contentItemSearch";
//import { status, json } from '../../../shared/fetch';

@Injectable()
export class ContentItemService {
  accountUrl: string;
  sectionApiBaseUrl: string;
  sectionTypeApiBaseUrl: string;
  itemApiBaseUrl: string;

  public readonly SEGMENT_DELIM: string = "_";
  public readonly TYPE_DELIM: string = "~";
  public readonly SECTION_DELIM: string = "*";

  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    @Inject("BASE_URL") private baseUrl: string
  ) {
    // this.accountUrl = `${this.baseUrl}/api/Account`;
    // this.sectionApiBaseUrl = `${this.baseUrl}/api/Section`;
    // this.sectionTypeApiBaseUrl = `${this.baseUrl}/api/SectionType`;
    // this.itemApiBaseUrl = `${this.baseUrl}/api/Item`;
  }

  private ExtractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error("Response status: " + res.status);
    }
    let body = res.json();
    return body || {};
  }

  public get(id: string): Observable<ContentItem> {
    const contentItemSearch = new ContentItemSearch();
    contentItemSearch.id = id;
    return this.getAll(contentItemSearch).pipe(
      map(items => {
        if (items.length >= 1) {
          return items[0];
        } else {
          return null;
        }
      })
    );
  }

  public getByAlias(
    module: string,
    type: string,
    alias: string
  ): Observable<ContentItem> {
    const contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = module;
    contentItemSearch.type = type;
    contentItemSearch.alias = alias;
    return this.getAll(contentItemSearch).pipe(
      map(items => {
        if (items.length >= 1) {
          return items[0];
        } else {
          return null;
        }
      })
    );
  }

  public getByAliasAndSection(
    module: string,
    type: string,
    alias: string,
    sectionItems: string
  ): Observable<ContentItem> {
    const contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = module;
    contentItemSearch.type = type;
    contentItemSearch.alias = alias;
    contentItemSearch.sectionItems = sectionItems;
    return this.getAll(contentItemSearch).pipe(
      map(items => {
        if (items.length >= 1) {
          return items[0];
        } else {
          return null;
        }
      })
    );
  }

  public getProfileById(userId: string): Observable<ContentItem> {
    const contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "profile";
    contentItemSearch.createdBy = userId;
    return this.getAll(contentItemSearch).pipe(
      map(items => {
        if (items.length >= 1) {
          return items[0];
        } else {
          return null;
        }
      })
    );
  }

  public getProfileByUsername(alias: string): Observable<ContentItem> {
    const contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "profile";
    contentItemSearch.alias = alias;
    return this.getAll(contentItemSearch).pipe(
      map(items => {
        if (items.length >= 1) {
          return items[0];
        } else {
          return null;
        }
      })
    );
  }

  public getCount(contentItemSearch: ContentItemSearch): Observable<number> {
    const result = this.apollo
      .watchQuery<ContentItemsCountQueryResult>({
        query: ContentItemsCountQuery,
        variables: {
          id: contentItemSearch.id,
          name: contentItemSearch.name,
          alias: contentItemSearch.alias,
          module: contentItemSearch.module,
          type: contentItemSearch.type,
          parentId: contentItemSearch.parentId,
          createdBy: contentItemSearch.createdBy,
          sectionItems: contentItemSearch.sectionItems,
          content: contentItemSearch.content,
          attribute01: contentItemSearch.attribute01,
          attribute02: contentItemSearch.attribute02,
          attribute03: contentItemSearch.attribute03,
          attribute04: contentItemSearch.attribute04,
          attribute05: contentItemSearch.attribute05,
          attribute06: contentItemSearch.attribute06,
          attribute07: contentItemSearch.attribute07,
          attribute08: contentItemSearch.attribute08,
          attribute09: contentItemSearch.attribute09,
          attribute10: contentItemSearch.attribute10,
          attribute11: contentItemSearch.attribute11,
          attribute12: contentItemSearch.attribute12,
          attribute13: contentItemSearch.attribute13,
          attribute14: contentItemSearch.attribute14,
          attribute15: contentItemSearch.attribute15,
          attribute16: contentItemSearch.attribute16,
          attribute17: contentItemSearch.attribute17,
          attribute18: contentItemSearch.attribute18,
          attribute19: contentItemSearch.attribute19,
          attribute20: contentItemSearch.attribute20,
          includeChildren: contentItemSearch.includeChildren,
          includeParents: contentItemSearch.includeParents
        }
      })
      .valueChanges.pipe(
        map(result => {
          return result.data.contentItemsCount.count;
        })
      );
    return result;
  }

  public getOne(contentItemSearch: ContentItemSearch): Observable<ContentItem> {
    var result = this.getAll(contentItemSearch).pipe(
      map(result => {
        if (result && result.length > 0) {
          return result[0];
        }
      })
    );

    return result;
  }

  public getAll(
    contentItemSearch: ContentItemSearch
  ): Observable<ContentItem[]> {
    var result = this.apollo
      .watchQuery<ContentItemsQueryResult>({
        query: ContentItemsQuery,
        variables: {
          id: contentItemSearch.id,
          name: contentItemSearch.name,
          alias: contentItemSearch.alias,
          module: contentItemSearch.module,
          type: contentItemSearch.type,
          parentId: contentItemSearch.parentId,
          createdBy: contentItemSearch.createdBy,
          sectionItems: contentItemSearch.sectionItems,
          content: contentItemSearch.content,
          attribute01: contentItemSearch.attribute01,
          attribute02: contentItemSearch.attribute02,
          attribute03: contentItemSearch.attribute03,
          attribute04: contentItemSearch.attribute04,
          attribute05: contentItemSearch.attribute05,
          attribute06: contentItemSearch.attribute06,
          attribute07: contentItemSearch.attribute07,
          attribute08: contentItemSearch.attribute08,
          attribute09: contentItemSearch.attribute09,
          attribute10: contentItemSearch.attribute10,
          attribute11: contentItemSearch.attribute11,
          attribute12: contentItemSearch.attribute12,
          attribute13: contentItemSearch.attribute13,
          attribute14: contentItemSearch.attribute14,
          attribute15: contentItemSearch.attribute15,
          attribute16: contentItemSearch.attribute16,
          attribute17: contentItemSearch.attribute17,
          attribute18: contentItemSearch.attribute18,
          attribute19: contentItemSearch.attribute19,
          attribute20: contentItemSearch.attribute20,
          includeChildren: contentItemSearch.includeChildren,
          includeParents: contentItemSearch.includeParents,
          orderBy: contentItemSearch.orderBy,
          page: contentItemSearch.page,
          pageSize: contentItemSearch.pageSize,
          offset: contentItemSearch.offset
        }
      })
      .valueChanges.pipe(
        map(result => {
          const items = result.data.contentItems;
          return this.order(items, contentItemSearch.orderBy.toLowerCase());
        })
      );
    return result;
  }

  public order(items: ContentItem[], orderBy: string): ContentItem[] {
    if (orderBy === "childcount" || orderBy === "childcount asc") {
      return items.sort((a, b) => a.childCount - b.childCount);
    }
    if (orderBy === "childcount desc") {
      return items.sort((a, b) => b.childCount - a.childCount);
    }
    if (orderBy === "createddate" || orderBy === "createddate asc") {
      return items.sort((a, b) => a.createdDateTicks - b.createdDateTicks);
    }
    if (orderBy === "createddate desc") {
      return items.sort((a, b) => b.createdDateTicks - a.createdDateTicks);
    }

    return items;
  }

  public addOrUpdate(contentItem: ContentItem): Observable<any> {
    var result = this.apollo
      .mutate({
        mutation: AddOrUpdateContentItemMutation,
        variables: {
          id: contentItem.id,
          name: contentItem.name,
          alias: contentItem.alias,
          module: contentItem.module,
          type: contentItem.type,
          parentId: contentItem.parentId,
          sectionItems: contentItem.sectionItems,
          content: contentItem.content,
          attribute01: contentItem.attribute01,
          attribute02: contentItem.attribute02,
          attribute03: contentItem.attribute03,
          attribute04: contentItem.attribute04,
          attribute05: contentItem.attribute05,
          attribute06: contentItem.attribute06,
          attribute07: contentItem.attribute07,
          attribute08: contentItem.attribute08,
          attribute09: contentItem.attribute09,
          attribute10: contentItem.attribute10,
          attribute11: contentItem.attribute11,
          attribute12: contentItem.attribute12,
          attribute13: contentItem.attribute13,
          attribute14: contentItem.attribute14,
          attribute15: contentItem.attribute15,
          attribute16: contentItem.attribute16,
          attribute17: contentItem.attribute17,
          attribute18: contentItem.attribute18,
          attribute19: contentItem.attribute19,
          attribute20: contentItem.attribute20
        }
      })
      .pipe(map(result => result.data.addOrUpdateContentItem.id));

    return result;
    //.subscribe({
    //next: x => console.log('Observer got a next value: ' + x),
    //error: err => alert(JSON.stringify(err)),
    //complete: () => console.log('Saved completed.'),
    //});
  }

  public delete(id: string): Observable<any> {
    var result = this.apollo
      .mutate({
        mutation: DeleteContentItemMutation,
        variables: {
          id: id
        }
      })
      .pipe(map(result => result.data.deleteContentItem.id));

    return result;
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return observableThrowError(error.json() || "Server error");
  }
}
