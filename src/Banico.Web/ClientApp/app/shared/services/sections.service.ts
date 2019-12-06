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

import { SectionsQuery } from "../../admin/sections/services/sections.queries";
import { SectionItemsQuery } from "../../admin/sections/services/sections.queries";
import {
  AddOrUpdateSectionMutation,
  AddOrUpdateSectionItemMutation
} from "../../admin/sections/services/sections.mutations";
import { SectionsQueryResult } from "../../admin/sections/services/sections.queryresults";
import { SectionItemsQueryResult } from "../../admin/sections/services/sections.queryresults";

import { Section } from "../../entities/section";
import { SectionItem } from "../../entities/section-item";
import { ContentItem } from "../../entities/content-item";
//import { status, json } from '../../../shared/fetch';

@Injectable()
export class SectionsService {
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

  private saveResult(res: any) {
    var id = "";
    var output;
    if (res.data.addOrUpdateSection) {
      id = res.data.addOrUpdateSection.id;
      output = res.data.addOrUpdateSection;
    }
    if (res.data.addOrUpdateSectionItem) {
      id = res.data.addOrUpdateSectionItem.id;
      output = res.data.addOrUpdateSectionItem;
    }

    if (!id) {
      throw new Error("Unable to create object.");
    }
    return output || {};
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error("Response status: " + res.status);
    }
    let body = res.json();
    return body || {};
  }

  public getSections(
    id: string,
    module: string,
    name: string
  ): Observable<Section[]> {
    var result = this.apollo
      .watchQuery<SectionsQueryResult>({
        query: SectionsQuery,
        variables: {
          id: id,
          module: module,
          name: name
        }
      })
      .valueChanges.pipe(map(result => result.data.sections));
    return result;
  }

  public addOrUpdateSection(
    id: string,
    name: string,
    modules: string
  ): Observable<any> {
    var result = this.apollo
      .mutate({
        mutation: AddOrUpdateSectionMutation,
        variables: {
          id: id,
          name: name,
          modules: modules
        }
      })
      .pipe(map(this.saveResult));

    return result;
    //.subscribe({
    //next: x => console.log('Observer got a next value: ' + x),
    //error: err => alert(JSON.stringify(err)),
    //complete: () => console.log('Saved completed.'),
    //});
  }

  public getSectionItemByPath(pathUrl: string): Observable<SectionItem[]> {
    var section = this.getSection(pathUrl);
    var parentPathUrl = this.getParentPathUrl(pathUrl);
    var alias = this.getAlias(pathUrl);

    return this.getSectionItems(
      "",
      section,
      parentPathUrl,
      alias,
      "",
      "",
      false
    );
  }

  private getSection(pathUrl: string): string {
    return pathUrl.split(this.TYPE_DELIM)[0];
  }

  private getParentPathUrl(pathUrl: string): string {
    var pathUrlWithoutSection = pathUrl.split(this.TYPE_DELIM)[1];
    var output: string = "";
    if (pathUrlWithoutSection) {
      var pathNodes = pathUrlWithoutSection.split(this.SEGMENT_DELIM);

      var i: number;
      for (i = 0; i < pathNodes.length - 1; i++) {
        if (output) {
          output = output + this.SEGMENT_DELIM;
        }
        output = output + pathNodes[i];
      }
    }

    return output;
  }

  private getAlias(pathUrl: string): string {
    if (pathUrl) {
      var pathUrlWithoutSection = pathUrl.split(this.TYPE_DELIM)[1];
      if (pathUrlWithoutSection && pathUrlWithoutSection.length > 0) {
        var pathNodes = pathUrlWithoutSection.split(this.SEGMENT_DELIM);
        return pathNodes[pathNodes.length - 1];
      }

      return "";
    }

    return "";
  }

  public getSectionItems(
    id: string,
    section: string,
    pathUrl: string,
    alias: string,
    name: string,
    parentId: string,
    isRoot: boolean
  ): Observable<SectionItem[]> {
    var result = this.apollo
      .watchQuery<SectionItemsQueryResult>({
        query: SectionItemsQuery,
        variables: {
          id: id,
          section: section,
          pathUrl: pathUrl,
          alias: alias,
          name: name,
          parentId: parentId,
          isRoot: isRoot
        }
      })
      .valueChanges.pipe(
        map(result => {
          return result.data.sectionItems;
        })
      );
    return result;
  }

  // Observable<Item[]>
  public getItemsByPathUrl(pathUrl: string): Observable<ContentItem[]> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let data = "pathUrl=" + pathUrl;

    return this.http.post<ContentItem[]>(
      this.itemApiBaseUrl + "/GetByPathUrl",
      data,
      {
        headers: headers
      }
    );
    //.map(this.ExtractData);
    //.catch(this.handleError);
  }

  public addOrUpdateSectionItem(
    id: string,
    section: string,
    parentId: string,
    pathUrl: string,
    pathName: string,
    name: string,
    alias: string
  ): Observable<any> {
    var result = this.apollo
      .mutate({
        mutation: AddOrUpdateSectionItemMutation,
        variables: {
          id: id,
          section: section,
          parentId: parentId,
          pathUrl: pathUrl,
          pathName: encodeURIComponent(pathName),
          name: encodeURIComponent(name),
          alias: alias
        }
      })
      .pipe(map(this.saveResult));

    return result;
    //.subscribe({
    //next: x => console.log('Observer got a next value: ' + x),
    //error: err => alert(JSON.stringify(err)),
    //complete: () => console.log('Saved completed.'),
    //});
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return observableThrowError(error.json() || "Server error");
  }
}
