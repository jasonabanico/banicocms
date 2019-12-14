import { Injectable, Inject } from "@angular/core";
import { Contact } from "../entities/contact";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { PluginService } from "../../../services/plugin.service";
import { ContentItem } from "../../../../entities/content-item";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class ContactService extends PluginService {
  public get(id: string): Observable<Contact> {
    return this.contentItemService.get(id).pipe(
      map(item => {
        return new Contact(item);
      })
    );
  }

  public getByAlias(alias: string): Observable<Contact> {
    return this.contentItemService.getByAlias("contact", "", alias).pipe(
      map(item => {
        return new Contact(item);
      })
    );
  }

  public addOrUpdate(contact: Contact): Observable<Contact> {
    let contentItem: ContentItem = contact.toContentItem();
    return this.contentItemService.addOrUpdate(contentItem).pipe(
      map(contentItem => new Contact(contentItem)),
      catchError(this.handleError)
    );
  }

  // public deleteContact(contact: Contact): Observable<{}> {
  //     let headers = new HttpHeaders();
  //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //     let data = 'id=' + contact.id;
  //     return this.http
  //         .post(this.appBaseUrl + '/Delete', data, {
  //             headers: headers
  //         }).pipe(
  //         map(this.extractData));
  //         //.subscribe({
  //             //next: x => console.log('Observer got a next value: ' + x),
  //             //error: err => alert(JSON.stringify(err)),
  //             //complete: () => console.log('Saved completed.'),
  //         //});
  // }

  // public sendContactEmail(contact: Contact, message: string): Observable<{}> {
  //     let headers = new HttpHeaders();
  //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //     let data = 'id=' + contact.id + '&message=' + message;
  //     return this.http
  //         .post(this.appBaseUrl + '/SendContactEmail', data, {
  //             headers: headers
  //         }).pipe(
  //         map(this.extractData));
  //         //.subscribe({
  //             //next: x => console.log('Observer got a next value: ' + x),
  //             //error: err => alert(JSON.stringify(err)),
  //             //complete: () => console.log('Saved completed.'),
  //         //});
  // }
}
