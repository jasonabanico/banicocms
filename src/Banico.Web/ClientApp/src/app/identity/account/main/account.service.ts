import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BaseService } from "../../../shared/services/base.service";
import { Observable } from 'rxjs/Rx';
import { isPlatformBrowser } from '@angular/common';
import { JSONP_ERR_NO_CALLBACK } from '@angular/common/http/src/jsonp';
import { WindowRefService } from '../../../shared/services/windowref.service';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable()
export class AccountService extends BaseService {
    public loggedIn: boolean;

    constructor(
        private http: HttpClient,
        @Inject(WindowRefService) windowRefService: WindowRefService,
        @Inject(PLATFORM_ID) platformId: Object,
        @Inject('BASE_URL') private baseUrl: string,
        private authService: AuthService
    ) {
        super(windowRefService, platformId);

        this.loggedIn = this.authService.hasToken();
    }

    public login(
        email: string,
        password: string
    ): Observable<Object> {
        let body = JSON.stringify({ 
            email, 
            password 
        });
        return this.http.post(this.baseUrl + "api/Account/Login", body, this.jsonRequestOptions)
        .catch(this.handleError);
    }

    public isSuperAdmin(): Observable<boolean> {
        return this.http.get<boolean>(this.baseUrl + "api/Account/IsSuperAdmin", this.jsonAuthRequestOptions )
        .catch(this.handleError);
    }

    public loggedInAs(): Observable<string> {
        return this.http.get<any>(this.baseUrl + "api/Account/GetUsername", this.jsonAuthRequestOptions)
        .map(data => {
            if (data) {
                return data;
            }

            return '';
        })
        .catch(this.handleError);
    }

    public logout(): Observable<boolean> {
        return this.http.post(this.baseUrl + "api/Account/Logout", {}, this.jsonAuthRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public register(
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
        return this.http.post(this.baseUrl + "api/Account/Register", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public confirmEmail(
        userId: string,
        code: string
    ): Observable<boolean> {
        let body = JSON.stringify({ 
            userId,
            code
        });
        return this.http.post(this.baseUrl + "api/Account/ConfirmEmail", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public resendConfirmation(
        email: string
    ) {
        let body = JSON.stringify({ 
            email
        });
        return this.http.post(this.baseUrl + "api/Account/ResendConfirmation", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public forgotPassword(
        email: string
    ): Observable<boolean> {
        let body = JSON.stringify({ 
            email 
        });
        return this.http.post(this.baseUrl + "api/Account/ForgotPassword", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }

    public resetPassword(
        email: string,
        code: string,
        password: string,
        confirmPassword: string
    ) {
        let body = JSON.stringify({ 
            email,
            code,
            password,
            confirmPassword 
        });
        return this.http.post(this.baseUrl + "api/Account/ResetPassword", body, this.jsonRequestOptions)
        .map(res => true)
        .catch(this.handleError);
    }
}