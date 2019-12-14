import { catchError, map } from "rxjs/operators";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseService } from "../../../shared/services/base.service";
import { WindowRefService } from "../../../shared/services/windowref.service";
import { User } from "../../../entities/user";

@Injectable()
export class UsersService extends BaseService {
  userUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(WindowRefService) windowRefService: WindowRefService,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject("BASE_URL") private baseUrl: string
  ) {
    super(windowRefService, platformId);
    this.userUrl = `${this.baseUrl}/api/Users`;
  }

  private addResult(res: any) {
    var id = 0;
    var output;
    if (res.data.addSection) {
      id = res.data.addSection.id;
      output = res.data.addSection;
    }
    if (res.data.addSectionItem) {
      id = res.data.addSectionItem.id;
      output = res.data.addSectionItem;
    }

    if (id === 0) {
      throw new Error("Unable to create object.");
    }
    return output || {};
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error("Response status: " + res.status);
    }
    let body = res.json();
    return body || {};
  }

  public getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(
        this.baseUrl + "api/Users/GetAll",
        this.jsonAuthRequestOptions()
      )
      .pipe(catchError(this.handleError));
  }

  public get(id: string): Observable<User> {
    return this.http
      .get<User>(
        this.baseUrl + "api/Users/Get?id=" + id,
        this.jsonAuthRequestOptions()
      )
      .pipe(catchError(this.handleError));
  }

  public addOrUpdate(
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    alias: string,
    email: string
  ): Observable<boolean> {
    if (!id) {
      return this.add(username, firstName, lastName, alias, email);
    } else {
      return this.update(id, username, firstName, lastName, alias, email);
    }
  }

  public add(
    username: string,
    firstName: string,
    lastName: string,
    alias: string,
    email: string
  ): Observable<boolean> {
    let body = JSON.stringify({
      username,
      firstName,
      lastName,
      alias,
      email
    });
    return this.http
      .post(this.baseUrl + "api/Users/Add", body, this.jsonAuthRequestOptions())
      .pipe(
        map(res => true),
        catchError(this.handleError)
      );
  }

  public update(
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    alias: string,
    email: string
  ): Observable<boolean> {
    let body = JSON.stringify({
      id,
      username,
      firstName,
      lastName,
      alias,
      email
    });
    return this.http
      .post(
        this.baseUrl + "api/Users/Update",
        body,
        this.jsonAuthRequestOptions()
      )
      .pipe(
        map(res => true),
        catchError(this.handleError)
      );
  }

  public getUserRole(id: string): Observable<string> {
    return this.http
      .get<string>(
        this.baseUrl + "api/Users/GetUserRole?id=" + id,
        this.jsonAuthRequestOptions()
      )
      .pipe(catchError(this.handleError));
  }

  public updateRole(id: string, roleId: string): Observable<boolean> {
    let body = JSON.stringify({
      id,
      roleId
    });
    return this.http
      .post(
        this.baseUrl + "api/Users/UpdateRole",
        body,
        this.jsonAuthRequestOptions()
      )
      .pipe(
        map(res => true),
        catchError(this.handleError)
      );
  }

  public delete(id: string): Observable<boolean> {
    return this.http
      .post(
        this.baseUrl + "api/Users/Delete",
        id,
        this.jsonAuthRequestOptions()
      )
      .pipe(
        map(res => true),
        catchError(this.handleError)
      );
  }
}
