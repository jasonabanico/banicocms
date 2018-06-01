import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BaseService } from "../shared/services/base.service";
import { Observable } from 'rxjs/Rx';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AccountService extends BaseService {
    public loggedIn: boolean;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject('BASE_URL') private baseUrl: string
    ) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            this.loggedIn = !!localStorage.getItem('auth_token');
        }
    }
    
    public changePassword(
        oldPassword: string,
        newPassword: string,
        confirmPassword: string
    ): Observable<Response> {
        let body = JSON.stringify({ 
            oldPassword,
            newPassword,
            confirmPassword 
        });
        return this.http.post(this.baseUrl + "api/Account/ChangePassword", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public login(
        email: string,
        password: string
    ): Observable<Response> {
        let body = JSON.stringify({ 
            email, 
            password 
        });
        return this.http.post(this.baseUrl + "/api/Account/Login", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public register(
        email: string,
        password: string,
        confirmPassword: string,
        invite: string
    ): Observable<Response> {
        let body = JSON.stringify({ 
            email,
            password,
            confirmPassword ,
            invite
        });
        return this.http.post(this.baseUrl + "api/Account/Register", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public resendConfirmation(
        email: string
    ) {
        let body = JSON.stringify({ 
            email
        });
        return this.http.post(this.baseUrl + "/api/Account/ResendConfirmation", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public resetPassword(
        email: string,
        code: string,
        password: string,
        resetPassword: string
    ) {
        let body = JSON.stringify({ 
            email,
            code,
            password,
            resetPassword 
        });
        return this.http.post(this.baseUrl + "/api/Account/ResetPassword", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public setPassword(
        newPassword: string,
        confirmPassword: string
    ) {
        let body = JSON.stringify({ 
            newPassword,
            confirmPassword 
        });
        return this.http.post(this.baseUrl + "/api/Account/SetPassword", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }
}