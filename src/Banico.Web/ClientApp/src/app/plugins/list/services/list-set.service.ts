import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PluginService } from "../../services/plugin.service";
import { ContentItem } from '../../../entities/content-item';
import { ListSet } from '../entities/list-set';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ListSetService extends PluginService {

    public get(id: string): Observable<ListSet> {
        return this.contentItemService.get(id)
        .map(item => {
            return new ListSet(item);
        });
    }
    
    public getByAlias(alias: string): Observable<ListSet> {
        return this.contentItemService.getByAlias(alias)
        .map(item => {
            return new ListSet(item);
        });
    }
    
    public getListSets(sectionItems: string): Observable<ListSet[]> {
        return this.contentItemService.getAll('', '', '',
        'list-set', '', '', sectionItems, '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '', true, true)
        .map(items => {
            var listSets: ListSet[] = new Array<ListSet>();
            items.forEach(function(item: ContentItem) {
                listSets.push(new ListSet(item));                
            });

            return listSets;
        });
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

        let contentItem: ContentItem = listSet.ToContentItem();
        return this.contentItemService.addOrUpdate(contentItem)
            .map(res => {
                return true;
            })
            .catch(this.handleError);
    }

    public delete(listItem: ListSet): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + listItem.id;
        return this.http
            .post(this.appBaseUrl + '/Delete', data, {
                headers: headers
            })
            .map(this.extractData);
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }
}