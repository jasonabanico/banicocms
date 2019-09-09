import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PluginService } from "../../services/plugin.service";
import { ContentItem } from '../../../entities/content-item';
import { HttpHeaders } from '@angular/common/http';
import { Subforum } from '../entities/subforum';

@Injectable()
export class ForumSubforumService extends PluginService {

    public get(id: string): Observable<Subforum> {
        return this.contentItemService.get(id).pipe(
        map(item => {
            return new Subforum(item);
        }));
    }
    
    public getByAlias(alias: string): Observable<Subforum> {
        return this.contentItemService.getByAlias(alias).pipe(
        map(item => {
            return new Subforum(item);
        }));
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
        subforum.sectionItems = sectionItems;

        let contentItem: ContentItem = subforum.ToContentItem();
        return this.contentItemService.addOrUpdate(contentItem).pipe(
            map(res => {
                return true;
            }),
            catchError(this.handleError));
    }

    public delete(subforum: Subforum): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + subforum.id;
        return this.http
            .post(this.appBaseUrl + '/Delete', data, {
                headers: headers
            }).pipe(
            map(this.extractData));
            //.subscribe({
                //next: x => console.log('Observer got a next value: ' + x),
                //error: err => alert(JSON.stringify(err)),
                //complete: () => console.log('Saved completed.'),
            //});
    }
}