import { catchError, map } from "rxjs/operators";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpRequest
} from "@angular/common/http";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";

import { WindowRefService } from "../../../shared/services/windowref.service";
import { BaseService } from "../../../shared/services/base.service";
import { ConfigsQuery } from "./configs.queries";
import { AddOrUpdateConfigMutation } from "./configs.mutations";
import { ConfigsQueryResult } from "./configs.queryresults";
import { Config } from "../../../entities/config";
//import { status, json } from '../../../shared/fetch';

@Injectable()
export class ConfigsService extends BaseService {
  accountUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(WindowRefService) windowRefService: WindowRefService,
    @Inject(PLATFORM_ID) platformId: Object,
    private apollo: Apollo,
    @Inject("BASE_URL") private baseUrl: string
  ) {
    super(windowRefService, platformId);
    // this.accountUrl = `${this.baseUrl}/api/Account`;
    // this.sectionApiBaseUrl = `${this.baseUrl}/api/Section`;
    // this.sectionTypeApiBaseUrl = `${this.baseUrl}/api/SectionType`;
    // this.itemApiBaseUrl = `${this.baseUrl}/api/Item`;
  }

  private addResult(res: any) {
    let id = "";
    let output = "";
    if (res.data.addConfig) {
      id = res.data.addConfig.id;
      output = res.data.addConfig;
    }

    if (id === "") {
      throw new Error("Unable to create object.");
    }
    return output || {};
  }

  private ExtractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error("Response status: " + res.status);
    }
    let body = res.json();
    return body || {};
  }

  public initialized(): Observable<boolean> {
    return this.get("", "initialized", "").pipe(
      map(item => {
        return item.value === "y";
      })
    );
  }

  public setInitialSettings(): Observable<boolean> {
    return this.http
      .post(
        this.baseUrl + "api/Config/SetInitialSettings",
        {},
        this.jsonAuthRequestOptions()
      )
      .pipe(
        map(res => true),
        catchError(this.handleError)
      );
  }

  public get(id: string, name: string, module: string): Observable<Config> {
    return this.getAll(id, name, module).pipe(
      map(items => {
        if (items.length >= 1) {
          return items[0];
        } else {
          return null;
        }
      })
    );
  }

  public getAll(
    id: string,
    name: string,
    module: string
  ): Observable<Config[]> {
    const result = this.apollo
      .watchQuery<ConfigsQueryResult>({
        query: ConfigsQuery,
        variables: {
          id: id,
          name: name,
          module: module
        }
      })
      .valueChanges.pipe(map(result => result.data.configs));
    return result;
  }

  public addOrUpdate(
    id: string,
    name: string,
    module: string,
    value: string
  ): Observable<any> {
    const result = this.apollo
      .mutate({
        mutation: AddOrUpdateConfigMutation,
        variables: {
          id: id,
          name: name,
          module: module,
          value: value
        }
      })
      .pipe(map(this.addResult));

    return result;
    //.subscribe({
    //next: x => console.log('Observer got a next value: ' + x),
    //error: err => alert(JSON.stringify(err)),
    //complete: () => console.log('Saved completed.'),
    //});
  }
}
