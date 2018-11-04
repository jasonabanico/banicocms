import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BaseService } from "./base.service";
import { Observable } from 'rxjs/Rx';
import { isPlatformBrowser } from '@angular/common';
import { JSONP_ERR_NO_CALLBACK } from '@angular/common/http/src/jsonp';
import { WindowRefService } from './windowref.service';

export class AuthService extends BaseService {
    public loggedIn: boolean;
    public redirectUrl: string;

    constructor(
        private http: HttpClient,
        @Inject(WindowRefService) windowRefService: WindowRefService,
        @Inject(PLATFORM_ID) platformId: Object,
        @Inject('BASE_URL') private baseUrl: string
    ) {
        super(windowRefService, platformId);

        if (isPlatformBrowser(this.platformId)) {
            this.loggedIn = !!this.windowRefService.nativeWindow.localStorage.getItem('auth_token');
        }
    }

    public isLoggedIn(): Observable<boolean> {
        return this.http.get<boolean>(this.baseUrl + "api/Account/IsLoggedIn", this.jsonAuthRequestOptions )
        .catch(this.handleError);
    }

    public isSuperAdmin(): Observable<boolean> {
        return this.http.get<boolean>(this.baseUrl + "api/Account/IsSuperAdmin", this.jsonAuthRequestOptions )
        .catch(this.handleError);
    }

    public loggedInAs(): Observable<string> {
        return this.http.post<any>(this.baseUrl + "api/Account/LoggedInAs", { } , this.jsonAuthRequestOptions)
        .map(data => {
            if (data) {
                return data;
            }

            return '';
        })
        .catch(this.handleError);
    }
}