import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PluginService } from "../../services/plugin.service";
import { ContentItem } from '../../../entities/content-item';
import { List } from './list';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ListService extends PluginService {

    public get(id: string): Observable<List> {
        return this.contentItemService.get(id)
        .map(item => {
            return new List(item);
        });
    }
    
    public getAll(): Observable<List[]> {
        return this.contentItemService.getAll('', '', '',
        'list', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            var lists: List[] = new Array<List>();
            items.forEach(function(item: ContentItem) {
                lists.push(new List(item));                
            });

            return lists;
        });
    }

    public getLists(sectionItems: string): Observable<List[]> {
        return this.contentItemService.getAll('', '', '',
        'list', '', '', sectionItems, '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            var lists: List[] = new Array<List>();
            items.forEach(function(item: ContentItem) {
                lists.push(new List(item));                
            });

            return lists;
        });
    }

    public getWitTextSearch(text: string): Observable<List[]> {
        return this.contentItemService.getAll('', '', '',
        'list', '', '', '', text, '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            var lists: List[] = new Array<List>();
            items.forEach(function(item: ContentItem) {
                lists.push(new List(item));                
            });

            return lists;
        });
    }

    public addOrUpdate(list: List): Observable<boolean> {
        let contentItem: ContentItem = list.ToContentItem();
        return this.contentItemService.addOrUpdate(contentItem)
            .map(res => true)
            .catch(this.handleError);
    }

    public delete(list: List): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + list.id;
        return this.http
            .post(this.appBaseUrl + '/Delete', data, {
                headers: headers
            })
            .map(this.ExtractData);
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }
}