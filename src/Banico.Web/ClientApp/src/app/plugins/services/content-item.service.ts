import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { ContentItemsQuery } from './content-item.queries';
import { AddOrUpdateContentItemMutation } from './content-item.mutations';
import { ContentItemsQueryResult } from './content-item.queryresults';
import { ContentItem } from '../../entities/content-item';
//import { status, json } from '../../../shared/fetch';

@Injectable()
export class ContentItemService {
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

    private ExtractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    public get(id: string): Observable<ContentItem> {
        return this.getAll(id, '', '',
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            if (items.length >= 1) {
                return items[0];
            } else {
                return null;
            }
        });
    }

    public getByAlias(alias: string): Observable<ContentItem> {
        return this.getAll('', '', alias,
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
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
        alias: string,
        module: string,
        parentId: string,
        createdBy: string,
        sectionItems: string,
        content: string,
        attribute01: string,
        attribute02: string,
        attribute03: string,
        attribute04: string,
        attribute05: string,
        attribute06: string,
        attribute07: string,
        attribute08: string,
        attribute09: string,
        attribute10: string,
        attribute11: string,
        attribute12: string,
        attribute13: string,
        attribute14: string,
        attribute15: string,
        attribute16: string,
        attribute17: string,
        attribute18: string,
        attribute19: string,
        attribute20: string
    ): Observable<ContentItem[]> {
        var result = this.apollo.watchQuery<ContentItemsQueryResult>({
            query: ContentItemsQuery,
            variables: {
                id: id,
                name: name,
                alias: alias,
                module: module,
                parentId: parentId,
                createdBy: createdBy,
                sectionItems: sectionItems,
                content: content,
                attribute01: attribute01,
                attribute02: attribute02,
                attribute03: attribute03,
                attribute04: attribute04,
                attribute05: attribute05,
                attribute06: attribute06,
                attribute07: attribute07,
                attribute08: attribute08,
                attribute09: attribute09,
                attribute10: attribute10,
                attribute11: attribute11,
                attribute12: attribute12,
                attribute13: attribute13,
                attribute14: attribute14,
                attribute15: attribute15,
                attribute16: attribute16,
                attribute17: attribute17,
                attribute18: attribute18,
                attribute19: attribute19,
                attribute20: attribute20
            }
        })
            .valueChanges
            .pipe(
              map(result => result.data.contentItems)
            );
        return result;
    }

    public addOrUpdate(contentItem: ContentItem, sectionItems: string): Observable<any> {
        var result = this.apollo.mutate({
            mutation: AddOrUpdateContentItemMutation,
            variables: {
                id: contentItem.id,
                name: contentItem.name,
                alias: contentItem.alias,
                module: contentItem.module,
                parentId: contentItem.parentId,
                sectionItems: sectionItems,
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
        .map(result => result.data.addOrUpdateContentItem.id);

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