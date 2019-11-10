import { throwError as observableThrowError, Observable } from "rxjs";
import { Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { WindowRefService } from "./windowref.service";

export abstract class BaseService {
  private isDebug = false;
  protected readonly TOKEN_NAME = "auth_token";
  protected readonly USER_ID = "user_id";
  protected readonly USER_NAME = "username";
  protected readonly TENANT = "tenant";
  protected readonly AVATAR_HASH = "avatar_hash";
  protected readonly IS_SUPERADMIN = "is_superadmin";
  protected readonly IS_ADMIN = "is_admin";

  protected localStorage: any;
  protected jsonHeader = new HttpHeaders({
    "Content-Type": "application/json"
  });
  protected jsonRequestOptions = { headers: this.jsonHeader };

  constructor(
    protected windowRefService: WindowRefService,
    protected platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage = windowRefService.nativeWindow.localStorage;
    }
  }

  protected handleError(error: any) {
    if (error) {
      if (error.headers) {
        var applicationError = error.headers.get("Application-Error");

        // either applicationError in header or model error in body
        if (applicationError) {
          return observableThrowError(applicationError);
        }

        var modelStateErrors: string = "";
        var serverError = error.error;

        return observableThrowError(serverError);
        // if (!serverError.type) {
        //   for (var key in serverError) {
        //     if (serverError[key])
        //       modelStateErrors += serverError[key] + '\n';
        //   }
        // }

        // modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        // return Observable.throw(modelStateErrors || 'Server error');
      }
    }
  }

  private getCookie(name): string {
    const value = "; " + document.cookie;
    const parts = value.split("; ");
    let result = "";
    parts.forEach(element => {
      const keyValue = element.split("=");
      if (keyValue[0].includes(name)) {
        result = keyValue[1];
      }
    });

    return result;
  }

  protected jsonAuthRequestOptions() {
    return { headers: this.authHeader() };
  }

  private authHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      headers = headers.set("Content-Type", "application/json");
      const authToken = this.windowRefService.nativeWindow.localStorage.getItem(
        this.TOKEN_NAME
      );
      headers = headers.set("Authorization", "Bearer " + authToken);
      headers = headers.set("X-XSRF-TOKEN", this.getCookie("XSRF-TOKEN"));
    }

    return headers;
  }

  public isAdmin(): boolean {
    this.writeDebugMessage("base.service: checking isAdmin");
    if (!this.localStorage) {
      return false;
    }
    const isAdminStr: string = this.localStorage.getItem(this.IS_ADMIN);
    let isAdmin = false;
    if (isAdminStr === "y") {
      isAdmin = true;
    }
    this.writeDebugMessage("base.service: isAdmin returns " + isAdmin);
    return isAdmin;
  }

  public isSuperAdmin(): boolean {
    this.writeDebugMessage("base.service: checking isSuperAdmin");
    if (!this.localStorage) {
      return false;
    }
    const isSuperAdminStr: string = this.localStorage.getItem(
      this.IS_SUPERADMIN
    );
    let isSuperAdmin = false;
    if (isSuperAdminStr === "y") {
      isSuperAdmin = true;
    }
    this.writeDebugMessage(
      "base.service: isSuperAdmin returns " + isSuperAdmin
    );
    return isSuperAdmin;
  }

  public writeDebugMessage(message: string) {
    if (this.isDebug) {
      console.log("-----> " + message);
    }
  }
}
