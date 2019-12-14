import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { PluginService } from "../../../services/plugin.service";
import { ContentItem } from "../../../../entities/content-item";
import { ListItem } from "../entities/list-item";
import { HttpHeaders } from "@angular/common/http";
import { ContentItemSearch } from "../../../entities/contentItemSearch";

@Injectable()
export class ListItemService extends PluginService {
  public get(id: string): Observable<ListItem> {
    return this.contentItemService.get(id).pipe(
      map(item => {
        return new ListItem(item);
      })
    );
  }

  public getByAlias(alias: string): Observable<ListItem> {
    return this.contentItemService.getByAlias("list", "item", alias).pipe(
      map(item => {
        return new ListItem(item);
      })
    );
  }

  public getListItems(listSetId: string): Observable<ListItem[]> {
    const contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "list-item";
    contentItemSearch.parentId = listSetId;
    return this.contentItemService.getAll(contentItemSearch).pipe(
      map(items => {
        var listItems: ListItem[] = new Array<ListItem>();
        items.forEach(function(item: ContentItem) {
          listItems.push(new ListItem(item));
        });

        return listItems;
      })
    );
  }

  public addOrUpdate(
    id: string,
    listSetId: string,
    name: string,
    alias: string,
    description: string
  ): Observable<boolean> {
    let listItem: ListItem = new ListItem(null);

    listItem.id = id;
    listItem.listSetId = listSetId;
    listItem.name = name;
    listItem.alias = alias;
    listItem.description = description;

    let contentItem: ContentItem = listItem.toContentItem();
    return this.contentItemService.addOrUpdate(contentItem).pipe(
      map(res => true),
      catchError(this.handleError)
    );
  }

  // public delete(listItem: ListItem): Observable<{}> {
  //     let headers = new HttpHeaders();
  //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //     let data = 'id=' + listItem.id;
  //     return this.http
  //         .post(this.appBaseUrl + '/Delete', data, {
  //             headers: headers
  //         }).pipe(
  //         map(this.extractData));
  //         //.subscribe({
  //             //next: x => console.log('Observer got a next value: ' + x),
  //             //error: err => alert(JSON.stringify(err)),
  //             //complete: () => console.log('Saved completed.'),
  //         //});
  // }
}
