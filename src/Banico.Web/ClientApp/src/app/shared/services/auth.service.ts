import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BaseService } from "./base.service";
import { Observable } from 'rxjs/Rx';
import { isPlatformBrowser } from '@angular/common';
import { JSONP_ERR_NO_CALLBACK } from '@angular/common/http/src/jsonp';
import { WindowRefService } from './windowref.service';
import * as jwt_decode from 'jwt-decode';

export class AuthService extends BaseService {
    public isAdmin: boolean;
    private userId: string;
    private localStorage: any;
    private readonly TOKEN_NAME = 'auth_token';

    constructor(
        private http: HttpClient,
        @Inject(WindowRefService) windowRefService: WindowRefService,
        @Inject(PLATFORM_ID) platformId: Object,
        @Inject('BASE_URL') private baseUrl: string
    ) {
        super(windowRefService, platformId);
        this.isAdmin = false;
        if (isPlatformBrowser(this.platformId)) {
            this.localStorage = windowRefService.nativeWindow.localStorage;
        }
    }

    public setLogin(userId: string) {
        this.userId = userId;
    }
    
    public loggedInAs(): string {
        return this.userId;
    }

    public getToken(): string {
        if (!this.localStorage) return '';
        return this.localStorage.getItem(this.TOKEN_NAME);
    }
    
    public setToken(token: string): void {
        if (this.localStorage) {
            this.localStorage.setItem(this.TOKEN_NAME, token);
        }
    }
    
    public getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);
        if (decoded.exp === undefined) return null;

        const date = new Date(0); 
        date.setUTCSeconds(decoded.exp);
        return date;
    }
    
    public isTokenExpired(token?: string): boolean {
        if (!token) token = this.getToken();
        if (!token) return true;
        const date = this.getTokenExpirationDate(token);
        if (date === undefined) return false;
        var result = !(date.valueOf() > new Date().valueOf());
        return result;
    }
      
    public removeToken() {
        if (this.localStorage) {
            this.localStorage.removeItem('auth_token');
        }
    }

    public hasToken(): boolean {
        if (!this.localStorage) return false;
        var authToken = this.localStorage.getItem('auth_token');
        return !!authToken;
    }

    public setIsAdmin(isAdmin: boolean) {
        this.isAdmin = isAdmin;
    }
}