import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PluginService } from "../../services/plugin.service";
import { ContentItem } from '../../../entities/content-item';
import { ListItem } from '../entities/list-item';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ListItemService extends PluginService {

    public get(id: string): Observable<ListItem> {
        return this.contentItemService.get(id)
        .map(item => {
            return new ListItem(item);
        });
    }
    
    public getListItems(listSetId: string): Observable<ListItem[]> {
        return this.contentItemService.getAll('', '', '',
        'list-item', listSetId, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '')
        .map(items => {
            var listItems: ListItem[] = new Array<ListItem>();
            items.forEach(function(item: ContentItem) {
                listItems.push(new ListItem(item));                
            });

            return listItems;
        });
    }

    public addOrUpdate(
        id: string,
        listSetId: string,
        name: string,
        description: string,
    ): Observable<boolean> {
        let listItem: ListItem = new ListItem(null);

        listItem.id = id;
        listItem.name = name;
        listItem.description = description;
        listItem.listSet = listSetId;

        let contentItem: ContentItem = listItem.ToContentItem();
        return this.contentItemService.addOrUpdate(contentItem)
            .map(res => true)
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
            .map(this.extractData);
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }
}