import { Injectable, Inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ContentItem } from '../../../entities/content-item';
import { PluginService } from '../../services/plugin.service';
import { Page } from './page';

@Injectable()
export class PageService extends PluginService {
    
    public get(id: string): Observable<Page> {
        return this.contentItemService.get(id)
        .map(item => {
            return new Page(item);
        });
    }
    
    public getByAlias(alias: string): Observable<Page> {
        return this.contentItemService.getByAlias(alias)
        .map(item => {
            return new Page(item);
        });
    }

    public addOrUpdate(page: Page): Observable<Page> {
        let contentItem: ContentItem = page.ToContentItem();
        return this.contentItemService.addOrUpdate(contentItem, '')
            .map(contentItem => new Page(contentItem))
            .catch(this.handleError);
    }

    public delete(page: Page): Observable<boolean> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + page.id;
        return this.http
            .post(this.appBaseUrl + '/Delete', data, {
                headers: headers
            })
            .map(res => true)
            .catch(this.handleError);
                //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }
}