import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { PluginService } from "../../../services/plugin.service";
import { ContentItem } from "../../../../entities/content-item";
import { List } from "../entities/list";
import { HttpHeaders } from "@angular/common/http";
import { ContentItemSearch } from "../../../entities/contentItemSearch";

@Injectable()
export class ListService extends PluginService {
  public get(id: string): Observable<List> {
    return this.contentItemService.get(id).pipe(
      map(listItem => {
        return new List(listItem);
      })
    );
  }

  public getAll(listSetId: string): Observable<List[]> {
    const contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "list";
    contentItemSearch.name = listSetId;
    return this.contentItemService.getAll(contentItemSearch).pipe(
      map(listItems => {
        var lists: List[] = new Array<List>();
        listItems.forEach(function(item: ContentItem) {
          lists.push(new List(item));
        });

        return lists;
      })
    );
  }

  public getByUser(userId: string): Observable<List[]> {
    const contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "list";
    contentItemSearch.alias = userId;
    return this.contentItemService.getAll(contentItemSearch).pipe(
      map(listItems => {
        var lists: List[] = new Array<List>();
        listItems.forEach(function(item: ContentItem) {
          lists.push(new List(item));
        });

        return lists;
      })
    );
  }

  public addOrUpdate(
    id: string,
    listSetId: string,
    name: string,
    description: string,
    listItems: string
  ): Observable<any> {
    var list: List = new List(null);
    list.id = id;
    list.listSetId = listSetId;
    list.name = name;
    list.description = description;
    list.listItems = listItems;

    let contentItem: ContentItem = list.toContentItem();
    return this.contentItemService.addOrUpdate(contentItem).pipe(
      catchError(error => {
        this.handleError(error);
        return new Observable<boolean>();
      })
    );
  }

  // public delete(list: List): Observable<{}> {
  //     let headers = new HttpHeaders();
  //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //     let data = 'id=' + list.id;
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
