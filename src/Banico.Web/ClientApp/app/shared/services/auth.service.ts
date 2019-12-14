import { Injectable, Inject, PLATFORM_ID, EventEmitter } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpRequest
} from "@angular/common/http";
import { BaseService } from "./base.service";
import { Observable, of } from "rxjs";
import { isPlatformBrowser } from "@angular/common";
import { WindowRefService } from "./windowref.service";
import * as jwt_decode from "jwt-decode";
import { Router } from "@angular/router";
import { ConfigsService } from "./configs.service";
import { map } from "rxjs/operators";

export class AuthService extends BaseService {
  public loginDataChanged = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    @Inject(WindowRefService) windowRefService: WindowRefService,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject("BASE_URL") private baseUrl: string,
    private router: Router,
    private configsService: ConfigsService
  ) {
    super(windowRefService, platformId);
  }

  public setUserId(userId: string) {
    if (this.localStorage) {
      return this.localStorage.setItem(this.USER_ID, userId);
    }
  }

  public getUserId(): string {
    if (!this.localStorage) {
      return "";
    }
    if (this.isTokenExpired()) {
      return "";
    }
    return this.localStorage.getItem(this.USER_ID);
  }

  public setUserName(userName: string) {
    if (this.localStorage) {
      return this.localStorage.setItem(this.USER_NAME, userName);
    }
  }

  public getUserName(): string {
    if (!this.localStorage) {
      return "";
    }
    if (this.isTokenExpired()) {
      return "";
    }
    return this.localStorage.getItem(this.USER_NAME);
  }

  public setTenant(tenant: string) {
    if (this.localStorage) {
      return this.localStorage.setItem(this.TENANT, tenant);
    }
  }

  public getTenant(): string {
    if (!this.localStorage) {
      return "";
    }
    if (this.isTokenExpired()) {
      return "";
    }
    return this.localStorage.getItem(this.TENANT);
  }

  public setAvatarHash(avatarHash: string) {
    if (this.localStorage) {
      return this.localStorage.setItem(this.AVATAR_HASH, avatarHash);
    }
  }

  public getAvatarHash(): string {
    if (!this.localStorage) {
      return "";
    }
    if (this.isTokenExpired()) {
      return "";
    }
    return this.localStorage.getItem(this.AVATAR_HASH);
  }

  public getToken(): string {
    if (!this.localStorage) {
      return "";
    }
    const item = this.localStorage.getItem(this.TOKEN_NAME);

    return item;
  }

  public setToken(token: string): void {
    if (this.localStorage) {
      this.localStorage.setItem(this.TOKEN_NAME, token);
    }
  }

  public getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    const result = !(date.valueOf() > new Date().valueOf());
    return result;
  }

  public removeToken() {
    if (this.localStorage) {
      this.localStorage.removeItem(this.TOKEN_NAME);
      this.localStorage.removeItem(this.USER_ID);
      this.localStorage.removeItem(this.USER_NAME);
      this.localStorage.removeItem(this.TENANT);
      this.localStorage.removeItem(this.AVATAR_HASH);
      this.localStorage.removeItem(this.IS_SUPERADMIN);
      this.localStorage.removeItem(this.IS_ADMIN);
      this.loginDataChanged.emit();
    }
  }

  public hasToken(): boolean {
    if (this.isTokenExpired()) {
      return false;
    }
    const authToken = this.localStorage.getItem(this.TOKEN_NAME);
    return !!authToken;
  }

  public setIsSuperAdmin(isSuperAdmin: boolean) {
    let isSuperAdminStr = "n";
    if (isSuperAdmin) {
      isSuperAdminStr = "y";
    }
    this.localStorage.setItem(this.IS_SUPERADMIN, isSuperAdminStr);
  }

  public setIsAdmin(isAdmin: boolean) {
    let isAdminStr = "n";
    if (isAdmin) {
      isAdminStr = "y";
    }
    this.localStorage.setItem(this.IS_ADMIN, isAdminStr);
  }

  public canAccess(
    module: string,
    url: string,
    autoRedirect: boolean
  ): Observable<boolean> {
    let result = false;
    this.writeDebugMessage("auth.service: checking access for " + module);

    if (!module) {
      result = this.checkLogin(url, autoRedirect);
      return of(result);
    }

    return this.getCanActivateConfig(module).pipe(
      map(configValue => {
        switch (configValue) {
          case "": {
            result = false; // secure by default
            break;
          }
          case "public": {
            result = true;
            break;
          }
          case "user": {
            result = this.checkLogin(url, autoRedirect);
            break;
          }
          case "admin": {
            result = this.checkAdmin(url, autoRedirect);
            break;
          }
          case "superadmin": {
            result = this.checkSuperAdmin(url, autoRedirect);
            break;
          }
        }

        this.writeDebugMessage(
          "auth.service: access required for module " +
            module +
            " is " +
            configValue +
            " and returns " +
            result
        );
        return result;
      })
    );
  }

  public getCanActivateConfig(module: string): Observable<string> {
    return this.configsService.get("", module, "canActivate").pipe(
      map(config => {
        if (config) {
          return config.value;
        } else {
          return "";
        }
      })
    );
  }

  public checkLogin(url: string, autoRedirect: boolean): boolean {
    const result = this.isTokenExpired();
    if (result && autoRedirect) {
      this.router.navigate(["/account/login"], {
        queryParams: { returnUrl: url }
      });
    }

    return !result;
  }

  public checkAdmin(url: string, autoRedirect: boolean): boolean {
    this.writeDebugMessage("auth.service: checking Admin");
    let result = this.checkLogin(url, autoRedirect);
    if (result) {
      result = this.isAdmin() || this.isSuperAdmin();
    }
    this.writeDebugMessage("auth.service: Admin returns " + result);
    return result;
  }

  public checkSuperAdmin(url: string, autoRedirect: boolean): boolean {
    this.writeDebugMessage("auth.service: checking SuperAdmin");
    let result = this.checkLogin(url, autoRedirect);
    if (result) {
      result = this.isSuperAdmin();
    }
    this.writeDebugMessage("auth.service: SuperAdmin returns " + result);
    return result;
  }
}
