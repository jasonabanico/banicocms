import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BaseService } from "../../../shared/services/base.service";
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { WindowRefService } from '../../../shared/services/windowref.service';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable()
export class ManageService extends BaseService {
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

    public changePassword(
        oldPassword: string,
        newPassword: string,
        confirmPassword: string
    ): Observable<boolean> {
        let body = JSON.stringify({ 
            oldPassword,
            newPassword,
            confirmPassword 
        });
        return this.http.post(this.baseUrl + "api/Manage/ChangePassword", body, this.jsonAuthRequestOptions()).pipe(
        map(res => true),
        catchError(this.handleError));
    }

    public setPassword(
        newPassword: string,
        confirmPassword: string
    ) {
        let body = JSON.stringify({ 
            newPassword,
            confirmPassword 
        });
        return this.http.post(this.baseUrl + "api/Account/SetPassword", body, this.jsonRequestOptions).pipe(
        map(res => true),
        catchError(this.handleError));
    }
}