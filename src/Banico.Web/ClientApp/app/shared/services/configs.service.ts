import { Injectable, Inject } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpRequest
} from "@angular/common/http";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ConfigsQuery } from "./configs.queries";
import { ConfigsQueryResult } from "./configs.queryresults";
import { Config } from "../../entities/config";
//import { status, json } from '../../../shared/fetch';

@Injectable()
export class ConfigsService {
  accountUrl: string;

  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  public domainAsTenant(): Observable<boolean> {
    return this.http
      .get(this.baseUrl + "api/Config/DomainAsTenant")
      .pipe(map((res: boolean) => res));
  }

  public get(id: string, module: string, name: string): Observable<Config> {
    let body = JSON.stringify({ id, module, name });
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers };

    return this.http.post<Config>(
      this.baseUrl + "api/Config/GetConfig",
      body,
      options
    );

    // -- NOT USING GRAPHQL BECAUSE OF UNAUTHENTICATED REQUESTS
    // return this.getAll(id, module, name).pipe(
    //   map(items => {
    //     if (items.length >= 1) {
    //       return items[0];
    //     } else {
    //       return null;
    //     }
    //   })
    // );
  }

  public getAll(
    id: string,
    module: string,
    name: string
  ): Observable<Config[]> {
    const result = this.apollo
      .watchQuery<ConfigsQueryResult>({
        query: ConfigsQuery,
        variables: {
          id: id,
          module: module,
          name: name
        }
      })
      .valueChanges.pipe(map(result => result.data.configs));
    return result;
  }
}
