import {map, catchError} from 'rxjs/operators';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';

import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import {BaseService} from "./base.service";

import { Observable ,  BehaviorSubject } from 'rxjs'; 

// Add the RxJS Observable operators we need in this app.
//import '../../rxjs-operators';
import { WindowRefService } from './windowref.service';
import { AuthService } from './auth.service';

@Injectable()

export class UserService extends BaseService {

  baseUrl: string = '';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(
    private http: HttpClient, 
    private configService: ConfigService,
    @Inject(WindowRefService) windowRefService: WindowRefService,
    @Inject(PLATFORM_ID) platformId: Object,
    private authService: AuthService
  ) {
    super(windowRefService, platformId);

    this.loggedIn = this.authService.hasToken();
    this.baseUrl = configService.getApiURI();
  }

  public register(
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string,
    location: string): 
    Observable<boolean> {
    let body = JSON.stringify({ email, password, firstName, lastName,location });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    return this.http.post(this.baseUrl + "/accounts", body, options).pipe(
      map(res => true),
      catchError(this.handleError),);
  }  

  public login(
    userName: string, 
    password: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
      this.baseUrl + '/accounts/login',
      JSON.stringify({ 
        userName, 
        password 
      }),{ 
        headers 
      }).pipe(
      //.map(res => res.json())
      map(res => {
        var result: any = res;
        this.authService.setToken(result.auth_token);
        this.loggedIn = true;
        return true;
      }),
      catchError(this.handleError),);
  }

  public logout() {
    this.authService.removeToken();
    this.loggedIn = false;
  }

  public facebookLogin(
    accessToken: string
  ) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ accessToken });  
    return this.http
      .post(
      this.baseUrl + '/externalauth/facebook', body, { headers }).pipe(
      //.map(res => res.json())
      map(res => {
        var result: any = res;
        this.authService.setToken(result.auth_token);
        this.loggedIn = true;

        return true;
      }),
      catchError(this.handleError),);
  }
}

