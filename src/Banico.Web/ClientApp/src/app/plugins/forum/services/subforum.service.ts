import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PluginService } from "../../services/plugin.service";
import { ContentItem } from '../../../entities/content-item';
import { HttpHeaders } from '@angular/common/http';
import { Subforum } from '../entities/subforum';

@Injectable()
export class SubforumService extends PluginService {

    public get(id: string): Observable<Subforum> {
        return this.contentItemService.get(id)
        .map(item => {
            return new Subforum(item);
        });
    }
    
    public getByAlias(alias: string): Observable<Subforum> {
        return this.contentItemService.getByAlias(alias)
        .map(item => {
            return new Subforum(item);
        });
    }
    
    public addOrUpdate(
        id: string,
        name: string,
        alias: string,
        description: string,
        sectionItems: string
    ): Observable<boolean> {
        let subforum: Subforum = new Subforum(null);

        subforum.id = id;
        subforum.name = name;
        subforum.alias = alias;
        subforum.description = description;

        let contentItem: ContentItem = subforum.ToContentItem();
        return this.contentItemService.addOrUpdate(contentItem, sectionItems)
            .map(res => {
                return true;
            })
            .catch(this.handleError);
    }

    public delete(subforum: Subforum): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + subforum.id;
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