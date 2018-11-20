import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PluginService } from "../../services/plugin.service";
import { ContentItem } from '../../../entities/content-item';
import { DirectoryItem } from './directory-item';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class DirectoryService extends PluginService {

    public get(id: string): Observable<DirectoryItem> {
        return this.contentItemService.get(id)
        .map(item => {
            return new DirectoryItem(item);
        });
    }
    
    public getAll(): Observable<DirectoryItem[]> {
        return this.contentItemService.getAll('', '', '',
        'directory', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            var directoryItems: DirectoryItem[] = new Array<DirectoryItem>();
            items.forEach(function(item: ContentItem) {
                directoryItems.push(new DirectoryItem(item));                
            });

            return directoryItems;
        });
    }

    public getDirectoryItems(sectionItems: string): Observable<DirectoryItem[]> {
        return this.contentItemService.getAll('', '', '',
        'directory', '', '', sectionItems, '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            var directoryItems: DirectoryItem[] = new Array<DirectoryItem>();
            items.forEach(function(item: ContentItem) {
                directoryItems.push(new DirectoryItem(item));                
            });

            return directoryItems;
        });
    }

    public getWithTextSearch(text: string): Observable<DirectoryItem[]> {
        return this.contentItemService.getAll('', '', '',
        'directory', '', '', '', text, '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '')
        .map(items => {
            var directoryItems: DirectoryItem[] = new Array<DirectoryItem>();
            items.forEach(function(item: ContentItem) {
                directoryItems.push(new DirectoryItem(item));                
            });

            return directoryItems;
        });
    }

    public addOrUpdate(directoryItem: DirectoryItem): Observable<DirectoryItem> {
        let contentItem: ContentItem = directoryItem.ToContentItem();
        return this.contentItemService.addOrUpdate(contentItem)
            .map(contentItem => new DirectoryItem(contentItem))
            .catch(this.handleError);
    }

    public delete(directoryItem: DirectoryItem): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + directoryItem.id;
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