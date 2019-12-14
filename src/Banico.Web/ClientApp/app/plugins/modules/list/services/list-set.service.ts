import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { PluginService } from "../../../services/plugin.service";
import { ContentItem } from "../../../../entities/content-item";
import { ListSet } from "../entities/list-set";
import { HttpHeaders } from "@angular/common/http";
import { ContentItemSearch } from "../../../entities/contentItemSearch";

@Injectable()
export class ListSetService extends PluginService {
  public get(id: string): Observable<ListSet> {
    return this.contentItemService.get(id).pipe(
      map(item => {
        return new ListSet(item);
      })
    );
  }

  public getByAlias(alias: string): Observable<ListSet> {
    return this.contentItemService.getByAlias("list", "set", alias).pipe(
      map(item => {
        return new ListSet(item);
      })
    );
  }

  public getListSets(sectionItems: string): Observable<ListSet[]> {
    const contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "list-set";
    contentItemSearch.sectionItems = sectionItems;
    return this.contentItemService.getAll(contentItemSearch).pipe(
      map(items => {
        var listSets: ListSet[] = new Array<ListSet>();
        items.forEach(function(item: ContentItem) {
          listSets.push(new ListSet(item));
        });

        return listSets;
      })
    );
  }

  public addOrUpdate(
    id: string,
    name: string,
    alias: string,
    description: string,
    sectionItems: string
  ): Observable<boolean> {
    let listSet: ListSet = new ListSet(null);

    listSet.id = id;
    listSet.name = name;
    listSet.alias = alias;
    listSet.description = description;
    listSet.sectionItems = sectionItems;

    let contentItem: ContentItem = listSet.toContentItem();
    return this.contentItemService.addOrUpdate(contentItem).pipe(
      map(res => {
        return true;
      }),
      catchError(this.handleError)
    );
  }

  // public delete(listItem: ListSet): Observable<{}> {
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
