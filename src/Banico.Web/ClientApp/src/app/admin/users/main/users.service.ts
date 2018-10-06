import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { BaseService } from '../../../shared/services/base.service';
import { WindowRefService } from '../../../shared/services/windowref.service';
import { User } from '../../../entities/user';

@Injectable()
export class UsersService extends BaseService {
    userUrl: string;

    constructor(
        private http: HttpClient,
        @Inject(WindowRefService) windowRefService: WindowRefService,
        @Inject(PLATFORM_ID) platformId: Object,
        @Inject('BASE_URL') private baseUrl: string
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

        if (id == 0){
            throw new Error('Unable to create object.');
        }
        return output || {};
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    public getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + "api/Users/GetAll", this.jsonAuthRequestOptions)
        .catch(this.handleError);
    }

    public getUser(id: string): Observable<User> {
        return this.http.get<User>(this.baseUrl + "api/Users/Get?id="+id, this.jsonAuthRequestOptions)
        .catch(this.handleError);
    }

    public addUser(
        email: string,
        password: string,
        confirmPassword: string,
        invite: string
    ): Observable<boolean> {
        let body = JSON.stringify({ 
            email,
            password,
            confirmPassword ,
            invite
        });
        return this.http.post(this.baseUrl + "api/Users/Add", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public updateUser(
        email: string,
        password: string,
        confirmPassword: string,
        invite: string
    ): Observable<boolean> {
        let body = JSON.stringify({ 
            email,
            password,
            confirmPassword ,
            invite
        });
        return this.http.post(this.baseUrl + "api/Users/Add", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public deleteUser(
        id: string
    ): Observable<boolean> {
        return this.http.post(this.baseUrl + "api/Users/Delete", id, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }
}