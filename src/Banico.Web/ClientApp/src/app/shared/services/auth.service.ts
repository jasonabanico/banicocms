import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BaseService } from "./base.service";
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { JSONP_ERR_NO_CALLBACK } from '@angular/common/http/src/jsonp';
import { WindowRefService } from './windowref.service';
import * as jwt_decode from 'jwt-decode';

export class AuthService extends BaseService {
    constructor(
        private http: HttpClient,
        @Inject(WindowRefService) windowRefService: WindowRefService,
        @Inject(PLATFORM_ID) platformId: Object,
        @Inject('BASE_URL') private baseUrl: string
    ) {
        super(windowRefService, platformId);
    }

    public setUserId(userId: string) {
        if (this.localStorage) {
            return this.localStorage.setItem(this.USER_ID, userId);
        }
    }
    
    public getUserId(): string {
        if (!this.localStorage) return '';
        return this.localStorage.getItem(this.USER_ID);
    }

    public setUserName(userName: string) {
        if (this.localStorage) {
            return this.localStorage.setItem(this.USER_NAME, userName);
        }
    }
    
    public getUserName(): string {
        if (!this.localStorage) return '';
        return this.localStorage.getItem(this.USER_NAME);
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
            this.localStorage.removeItem(this.TOKEN_NAME);
            this.localStorage.removeItem(this.USER_ID);
            this.localStorage.removeItem(this.IS_ADMIN);
        }
    }

    public hasToken(): boolean {
        if (!this.localStorage) return false;
        var authToken = this.localStorage.getItem(this.TOKEN_NAME);
        return !!authToken;
    }

    public setIsAdmin(isAdmin: boolean) {
        var isAdminStr = "n";
        if (isAdmin) {
            isAdminStr = "y";
        }
        this.localStorage.setItem(this.IS_ADMIN, isAdminStr);
    }
}