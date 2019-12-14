import {map, catchError} from 'rxjs/operators';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BaseService } from '../../../shared/services/base.service';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
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
        username: string,
        password: string
    ): Observable<Object> {
        const body = JSON.stringify({
            username,
            password
        });
        return this.http.post(this.baseUrl + 'api/Account/Login', body, this.jsonRequestOptions).pipe(
        catchError(this.handleError));
    }

    // public isSuperAdmin(): Observable<boolean> {
    //     return this.http.get<boolean>(this.baseUrl + 'api/Account/IsSuperAdmin', this.jsonAuthRequestOptions()).pipe(
    //     catchError(this.handleError));
    // }

    public isInviteOnly(): Observable<string> {
        return this.http.get<any>(this.baseUrl + 'api/Account/IsInviteOnly').pipe(
        map(data => {
            if (data) {
                return data;
            }

            return '';
        }),
        catchError(this.handleError), );
    }

    public loggedInAs(): Observable<string> {
        return this.http.get<any>(this.baseUrl + 'api/Account/GetUsername', this.jsonAuthRequestOptions()).pipe(
        map(data => {
            if (data) {
                return data;
            }

            return '';
        }),
        catchError(this.handleError), );
    }

    public logout(): Observable<boolean> {
        return this.http.post(this.baseUrl + 'api/Account/Logout', {}, this.jsonAuthRequestOptions()).pipe(
        map(res => true),
        catchError(this.handleError), );
    }

    public register(
        username: string,
        email: string,
        password: string,
        confirmPassword: string,
        invite: string
    ): Observable<boolean> {
        const body = JSON.stringify({
            username,
            email,
            password,
            confirmPassword ,
            invite
        });
        return this.http.post(this.baseUrl + 'api/Account/Register', body, this.jsonRequestOptions).pipe(
        map(res => true),
        catchError(this.handleError), );
    }

    public confirmEmail(
        userId: string,
        code: string
    ): Observable<boolean> {
        const body = JSON.stringify({
            userId,
            code
        });
        return this.http.post(this.baseUrl + 'api/Account/ConfirmEmail', body, this.jsonRequestOptions).pipe(
        map(res => true),
        catchError(this.handleError), );
    }

    public resendConfirmation(
        email: string
    ): Observable<any> {
        const body = JSON.stringify({
            email
        });
        return this.http.post(this.baseUrl + 'api/Account/ResendConfirmation', body, this.jsonRequestOptions);
    }

    public forgotPassword(
        email: string
    ): Observable<boolean> {
        const body = JSON.stringify({
            email
        });
        return this.http.post(this.baseUrl + 'api/Account/ForgotPassword', body, this.jsonRequestOptions).pipe(
        map(res => true),
        catchError(this.handleError), );
    }

    public resetPassword(
        email: string,
        code: string,
        password: string,
        confirmPassword: string
    ) {
        const body = JSON.stringify({
            email,
            code,
            password,
            confirmPassword
        });
        return this.http.post(this.baseUrl + 'api/Account/ResetPassword', body, this.jsonRequestOptions).pipe(
        map(res => true),
        catchError(this.handleError), );
    }
}
