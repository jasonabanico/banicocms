import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PluginService } from "../../services/plugin.service";
import { ContentItem } from '../../../entities/contentitem';
import { ListItem } from './listitem';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ListItemService extends PluginService {

    public get(id: string): Observable<ListItem> {
        return this.contentItemService.get(id)
        .map(item => {
            return new ListItem(item);
        });
    }
    
    public getAll(): Observable<ListItem[]> {
        return this.contentItemService.getAll('', '', '',
        'listitem', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            var listItems: ListItem[] = new Array<ListItem>();
            items.forEach(function(item: ContentItem) {
                listItems.push(new ListItem(item));                
            });

            return listItems;
        });
    }

    public getListItems(sectionItems: string): Observable<ListItem[]> {
        return this.contentItemService.getAll('', '', '',
        'listitem', '', '', sectionItems, '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            var listItems: ListItem[] = new Array<ListItem>();
            items.forEach(function(item: ContentItem) {
                listItems.push(new ListItem(item));                
            });

            return listItems;
        });
    }

    public getWitTextSearch(text: string): Observable<ListItem[]> {
        return this.contentItemService.getAll('', '', '',
        'listitem', '', '', '', text, '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            var listItems: ListItem[] = new Array<ListItem>();
            items.forEach(function(item: ContentItem) {
                listItems.push(new ListItem(item));                
            });

            return listItems;
        });
    }

    public add(listItem: ListItem): Observable<ListItem> {
        let contentItem: ContentItem = listItem.ToContentItem();
        return this.contentItemService.add(contentItem)
            .map(contentItem => new ListItem(contentItem))
            .catch(this.handleError);
    }

    public update(listItem: ListItem): Observable<{}> {
        let contentItem: ContentItem = listItem.ToContentItem();
        return this.contentItemService.update(contentItem)
            .map(contentItem => new ListItem(contentItem))
            .catch(this.handleError);
    }

    public delete(listItem: ListItem): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + listItem.id;
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