import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Invite } from "../entities/invite";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ORIGIN_URL } from "../../../../shared/constants/baseurl.constants";

@Injectable()
export class InviteService {
  inviteUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(ORIGIN_URL) private baseUrl: string
  ) {
    this.inviteUrl = `${this.baseUrl}api/Invite`;
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error("Response status: " + res.status);
    }
    let body = res.json();
    return body || {};
  }

  public addInvite(invite: Invite): Observable<Invite> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let data = "emails=" + invite.emails;
    return this.http.post<Invite>(this.inviteUrl + "/Add", data, {
      headers: headers
    });
    //.pipe(map(this.extractData));
    //.subscribe({
    //next: x => console.log('Observer got a next value: ' + x),
    //error: err => alert(JSON.stringify(err)),
    //complete: () => console.log('Saved completed.'),
    //});
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    // return Observable.throw(error.json().error || 'Server error');
  }
}
