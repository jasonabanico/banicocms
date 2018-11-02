import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { ConfigsQuery } from './configs.queries';
import { ConfigsQueryResult } from './configs.queryresults';
import { Config } from '../../entities/config';
//import { status, json } from '../../../shared/fetch';

@Injectable()
export class ConfigsService {
    accountUrl: string;

    constructor(
        private http: HttpClient,
        private apollo: Apollo,
        @Inject('BASE_URL') private baseUrl: string
    ) {
    }

    public get(
        id: string,
        name: string,
        module: string
    ): Observable<Config> {
        return this.getAll(id, name, module)
        .map(items => {
            if (items.length >= 1) {
                return items[0];
            } else {
                return null;
            }
        });
    }

    public getAll(
        id: string,
        name: string,
        module: string    
    ): Observable<Config[]> {
        var result = this.apollo.watchQuery<ConfigsQueryResult>({
            query: ConfigsQuery,
            variables: {
                id: id,
                name: name,
                module: module
            }
        })
            .valueChanges
            .pipe(
              map(result => result.data.configs)
            );
        return result;
    }
}