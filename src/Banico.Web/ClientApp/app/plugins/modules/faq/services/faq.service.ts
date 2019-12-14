import { Injectable, Inject } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { PluginService } from "../../../services/plugin.service";
import { ContentItem } from "../../../../entities/content-item";
import { Faq } from "../entities/faq";
import { Qa } from "../entities/qa";

@Injectable()
export class FaqService extends PluginService {
  public get(id: string): Observable<Faq> {
    return this.contentItemService.get(id).pipe(
      map(item => {
        return new Faq(item);
      })
    );
  }

  public getByAlias(alias: string): Observable<Faq> {
    return this.contentItemService.getByAlias("faq", "", alias).pipe(
      map(item => {
        return new Faq(item);
      })
    );
  }

  public setQa(content: string): Qa[] {
    var output: Qa[] = Array<Qa>();
    var objects = eval("(" + content + ")");
    for (let object in objects) {
      var qa = new Qa();
      qa.question = object["question"];
      qa.answer = object["answer"];
      output.push(qa);
    }

    return output;
  }

  public addOrUpdate(faq: Faq): Observable<Faq> {
    let contentItem: ContentItem = faq.toContentItem();
    return this.contentItemService.addOrUpdate(contentItem).pipe(
      map(contentItem => new Faq(contentItem)),
      catchError(this.handleError)
    );
  }

  // public delete(faq: Faq): Observable<{}> {
  //     let headers = new HttpHeaders();
  //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //     let data = 'id=' + faq.id;
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
}
