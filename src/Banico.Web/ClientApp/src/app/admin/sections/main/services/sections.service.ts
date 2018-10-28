import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { SectionsQuery } from './sections.queries';
import { SectionItemsQuery } from './sections.queries';
import { AddOrUpdateSectionMutation, AddOrUpdateSectionItemMutation } from './sections.mutations';
import { SectionsQueryResult } from './sections.queryresults';
import { SectionItemsQueryResult } from './sections.queryresults';

import { Section } from '../../../../entities/section';
import { SectionItem } from '../../../../entities/sectionitem';
import { ContentItem } from '../../../../entities/contentitem';
//import { status, json } from '../../../shared/fetch';

@Injectable()
export class SectionsService {
    accountUrl: string;
    sectionApiBaseUrl: string;
    sectionTypeApiBaseUrl: string;
    itemApiBaseUrl: string;

    public readonly PATH_DELIM: string = '_';
    public readonly TYPE_DELIM: string = '~';
    public readonly SECTION_DELIM: string = '*';

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

    private saveResult(res: any) {
        var id = 0;
        var output;
        if (res.data.addSection) {
            id = res.data.addSection.id;
            output = res.data.addSection;
        }
        if (res.data.addSectionItem) {
            id = res.data.addSectionItem.id;
            output = res.data.addSectionItem;
        }

        if (id == 0){
            throw new Error('Unable to create object.');
        }
        return output || {};
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    public getSections(
        id: string,
        module: string,
        name: string
    ): Observable<Section[]> {
        var result = this.apollo.watchQuery<SectionsQueryResult>({
            query: SectionsQuery,
            variables: {
                id: id,
                module: module,
                name: name
            }
        })
            .valueChanges
            .pipe(
              map(result => result.data.sections)
            );
        return result;
    }

    public addOrUpdateSection(
        id: string,
        name: string,
        modules: string
    ): Observable<any> {
        var result = this.apollo.mutate({
            mutation: AddOrUpdateSectionMutation,
            variables: {
                id: id,
                name: name,
                modules: modules
            }
        }).map(this.saveResult);

        return result;
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }

    public getSectionItemByPath(
        pathUrl: string
    ): Observable<SectionItem[]> {
        var section = this.getSection(pathUrl);
        var parentPathUrl = this.getParentPathUrl(pathUrl);
        var alias = this.getAlias(pathUrl);

        return this.getSectionItems('', section, parentPathUrl, alias, '', '', false)
    }

    private getSection(pathUrl: string): string {
        return pathUrl.split(this.TYPE_DELIM)[0];
    }

    private getParentPathUrl(pathUrl: string): string {
        var pathUrlWithoutSection = pathUrl.split(this.TYPE_DELIM)[1];
        var output: string = '';
        if (pathUrlWithoutSection) {
            var pathNodes = pathUrlWithoutSection.split(this.PATH_DELIM);
        
            var i: number;
            for (i = 0; i < (pathNodes.length - 1); i++) {
                if (output) {
                    output = output + this.PATH_DELIM;
                }
                output = output + pathNodes[i];
            }
        }

        return output;
    }

    private getAlias(pathUrl: string): string {
        if (pathUrl) {
            var pathUrlWithoutSection = pathUrl.split(this.TYPE_DELIM)[1];
            if (pathUrlWithoutSection && (pathUrlWithoutSection.length > 0)) {
                var pathNodes = pathUrlWithoutSection.split(this.PATH_DELIM);
                return pathNodes[pathNodes.length - 1];
            }

            return '';
        }

        return '';
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
        var result = this.apollo.watchQuery<SectionItemsQueryResult>({
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
            .valueChanges
            .pipe(
              map(result => {
                  return result.data.sectionItems;
              })
            );
        return result;
    }
    
    // Observable<Item[]>
    public getItemsByPathUrl(pathUrl: string): Observable<ContentItem[]> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'pathUrl=' + pathUrl;

        return this.http
            .post<ContentItem[]>(this.itemApiBaseUrl + '/GetByPathUrl', data, {
                headers: headers
            });
            //.map(this.ExtractData);
            //.catch(this.handleError);
    }
    
    // Observable<string>
    public isLoggedIn(): Observable<string> {
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

    public addOrUpdateSectionItem(
        id: string,
        section: string,
        parentId: string,
        pathUrl: string,
        pathName: string,
        name: string,
        alias: string
    ): Observable<any> {
        var result = this.apollo.mutate({
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
        }).map(this.saveResult);

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