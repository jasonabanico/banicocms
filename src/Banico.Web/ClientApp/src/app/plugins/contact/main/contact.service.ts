import { Injectable, Inject } from '@angular/core';
import { Contact } from './contact';
import { Observable } from 'rxjs/Observable';
import { PluginService } from '../../services/plugin.service';
import { ContentItem } from '../../../entities/content-item';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ContactService extends PluginService {
    public get(id: string): Observable<Contact> {
        return this.contentItemService.get(id)
        .map(item => {
            return new Contact(item);
        });
    }
    
    public getByAlias(alias: string): Observable<Contact> {
        return this.contentItemService.getByAlias(alias)
        .map(item => {
            return new Contact(item);
        });
    }

    public addOrUpdate(contact: Contact): Observable<Contact> {
        let contentItem: ContentItem = contact.ToContentItem();
        return this.contentItemService.addOrUpdate(contentItem)
            .map(contentItem => new Contact(contentItem))
            .catch(this.handleError);
    }

    public DeleteContact(contact: Contact): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + contact.id;
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

    public SendContactEmail(contact: Contact, message: string): Observable<{}> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'id=' + contact.id + '&message=' + message;
        return this.http
            .post(this.appBaseUrl + '/SendContactEmail', data, {
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