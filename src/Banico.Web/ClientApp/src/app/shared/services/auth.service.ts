import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BaseService } from "./base.service";
import { Observable } from 'rxjs/Rx';
import { isPlatformBrowser } from '@angular/common';
import { JSONP_ERR_NO_CALLBACK } from '@angular/common/http/src/jsonp';
import { WindowRefService } from './windowref.service';

export class AuthService extends BaseService {
    public isAdmin: boolean;
    private userId: string;

    constructor(
        private http: HttpClient,
        @Inject(WindowRefService) windowRefService: WindowRefService,
        @Inject(PLATFORM_ID) platformId: Object,
        @Inject('BASE_URL') private baseUrl: string
    ) {
        super(windowRefService, platformId);
        this.isAdmin = false;
    }

    public setAuthToken(token: any) {
        window.localStorage.setItem('auth_token', token);
    }

    public setLogin(userId: string) {
        this.userId = userId;
    }
    
    public loggedInAs(): string {
        return this.userId;
    }

    public removeAuthToken() {
        this.windowRefService.nativeWindow.localStorage.removeItem('auth_token');
    }

    public hasAuthToken(): boolean {
        return !!this.windowRefService.nativeWindow.localStorage.getItem('auth_token');
    }

    public setIsAdmin(isAdmin: boolean) {
        this.isAdmin = isAdmin;
    }
}