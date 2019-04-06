import { Injectable, Inject, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PluginService } from '../../services/plugin.service';
import { ContentItem } from '../../../entities/content-item';
import { Link } from '../entities/link';

@Injectable()
export class LinksService extends PluginService {
    public module = 'link';

    public get(id: string): Observable<Link> {
        return this.contentItemService.get(id).pipe(
        map(linkItem => {
            return new Link(linkItem);
        }));
    }

    public getLinksCount(sectionItems: string): Observable<number> {
        return this.contentItemService.getCount('', '', '',
        this.module, '', '', sectionItems, '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '', true, true).pipe();
    }

    public getLinks(sectionItems: string): Observable<Link[]> {
        return this.contentItemService.getAll('', '', '',
        this.module, '', '', sectionItems, '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '', true, true, '', 0, this.pageSize).pipe(
        map(items => {
            const links: Link[] = new Array<Link>();
            items.forEach(function(item: ContentItem) {
                links.push(new Link(item));
            });

            return links;
        }));
    }

    public addOrUpdate(
        id: string,
        name: string,
        sectionItems: string,
        description: string,
        url: string
    ): Observable<any> {
        const link: Link = new Link(null);
        link.id = id;
        link.name = name;
        link.sectionItems = sectionItems;
        link.description = description;
        link.url = url;

        const contentItem: ContentItem = link.ToContentItem();
        return this.contentItemService.addOrUpdate(contentItem).pipe(
            catchError(error => {
                this.handleError(error);
                return new Observable<boolean>();
            }));
    }

    public delete(link: Link): Observable<{}> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const data = 'id=' + link.id;
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