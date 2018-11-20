import { Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { WindowRefService } from './windowref.service';

export abstract class BaseService {  
  protected readonly TOKEN_NAME = 'auth_token';
  protected readonly USER_ID = 'user_id';
  protected readonly USER_NAME = 'username';
  protected readonly IS_ADMIN = 'is_admin';

  protected localStorage: any;
  protected jsonHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
  protected jsonRequestOptions = { headers: this.jsonHeader };
  protected jsonAuthRequestOptions = { headers: this.authHeader() };

  constructor(
    protected windowRefService: WindowRefService,
    protected platformId: Object
    ) { 
      if (isPlatformBrowser(this.platformId)) {
        this.localStorage = windowRefService.nativeWindow.localStorage;
    }
  }
  
  protected handleError(error: any) {
      var applicationError = error.headers.get('Application-Error');

      // either applicationError in header or model error in body
      if (applicationError) {
        return Observable.throw(applicationError);
      }

      var modelStateErrors: string = '';
      var serverError = error.error;

      return Observable.throw(serverError);
      // if (!serverError.type) {
      //   for (var key in serverError) {
      //     if (serverError[key])
      //       modelStateErrors += serverError[key] + '\n';
      //   }
      // }

      // modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
      // return Observable.throw(modelStateErrors || 'Server error');
    }

    private getCookie(name): string {
      var value = '; ' + document.cookie;
      var parts = value.split('; ');
      var result = "";
      parts.forEach(element => {
        var keyValue = element.split('=');
        if (keyValue[0].includes(name)) {
          result = keyValue[1];
        }
      });

      return result;
    }

  private authHeader(): HttpHeaders {
      let headers = new HttpHeaders();
      if (isPlatformBrowser(this.platformId)) {
        headers = headers.set('Content-Type', 'application/json');
        let authToken = this.windowRefService.nativeWindow.localStorage.getItem(this.TOKEN_NAME);
        headers = headers.set('Authorization', 'Bearer ' + authToken);
        headers = headers.set('X-XSRF-TOKEN', this.getCookie('XSRF-TOKEN'));
      }

      return headers;
    }

    public isAdmin(): boolean {
      if (!this.localStorage) return false;
      var isAdminStr: string = this.localStorage.getItem(this.IS_ADMIN);
      var isAdmin: boolean = false;
      if (isAdminStr == "y") {
          isAdmin = true;
      }
      return isAdmin;
  }
}