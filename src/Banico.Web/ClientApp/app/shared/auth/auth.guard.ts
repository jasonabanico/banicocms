import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfigsService } from '../services/configs.service';
import { Config } from '../../entities/config';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private debug = false;

  constructor(
    private authService: AuthService, 
    private configsService: ConfigsService,
    private router: Router) {
  }

public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const module = route.data['module'] as string;
    const url: string = state.url;

    let result = false;

    if (this.debug) {
      alert(module);
      alert(url);
    }

    if (!module) {
      result = this.checkLogin(url);
      return of(result);
    }

    return this.getCanActivateConfig(module).pipe(
      map(
        configValue => {
          if (this.debug) {
            alert(configValue);
          }

          switch (configValue) {
            case '': {
              result = false; // secure by default
              break;
            }
            case 'public': {
              result = true;
              break;
            }
            case 'user': {
              result = this.checkLogin(url);
              break;
            }
            case 'admin': {
              result = this.checkAdmin(url);
              break;
            }
          }

          return result;
        }
      ));
  }

  private getCanActivateConfig(module: string): Observable<string> {
    return this.configsService.get('', module, 'canActivate').pipe(
      map(config => {
        if (config) {
          return config.value;
        } else {
          return '';
        }
      }));
  }

  private checkLogin(url: string): boolean {
    const result = this.authService.isTokenExpired();
    if (result) {
      this.router.navigate(['/account/login'], { queryParams: { returnUrl: url } });
    }

    return !result;
  }

  private checkAdmin(url: string): boolean {
    let result = this.checkLogin(url);
    if (result) {
      result = this.authService.isAdmin();
    }
    return result;
  }
}
