import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { ConfigsQuery } from './configs.queries';
import { AddOrUpdateConfigMutation } from './configs.mutations';
import { ConfigsQueryResult } from './configs.queryresults';
import { Config } from '../../../entities/config';
//import { status, json } from '../../../shared/fetch';

@Injectable()
export class ConfigsService {
    accountUrl: string;
    sectionApiBaseUrl: string;
    sectionTypeApiBaseUrl: string;
    itemApiBaseUrl: string;

    constructor(
        private http: HttpClient,
        private apollo: Apollo,
        @Inject('BASE_URL') private baseUrl: string
    ) {
        // this.accountUrl = `${this.baseUrl}/api/Account`;
        // this.sectionApiBaseUrl = `${this.baseUrl}/api/Section`;
        // this.sectionTypeApiBaseUrl = `${this.baseUrl}/api/SectionType`;
        // this.itemApiBaseUrl = `${this.baseUrl}/api/Item`;
    }

    private addResult(res: any) {
        var id = '';
        var output;
        if (res.data.addContentItem) {
            id = res.data.addContentItem.id;
            output = res.data.addContentItem;
        }

        if (id == ''){
            throw new Error('Unable to create object.');
        }
        return output || {};
    }

    private ExtractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
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

    // Observable<string>
    public IsLoggedIn(): Observable<string> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http
            .post<string>(this.accountUrl + '/IsLoggedIn', '', {
                headers: headers
            });
            //.map(this.ExtractData);
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }

    public addOrUpdate(
        id: string,
        name: string,
        module: string,
        value: string
    ): Observable<any> {
        var result = this.apollo.mutate({
            mutation: AddOrUpdateConfigMutation,
            variables: {
                id: id,
                name: name,
                module: module,
                value: value
            }
        }).map(this.addResult);

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
        return Observable.throw(error.json() || 'Server error');
    }
}