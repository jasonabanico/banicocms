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
  constructor(
    private authService: AuthService, 
    private configsService: ConfigsService,
    private router: Router) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    let module = route.data["module"] as string;
    let url: string = state.url;

    return this.getConfig(module)
      .map(
        configValue => {
          var result = false;
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
      );
  }

  private getConfig(module: string): Observable<string> {
    return this.configsService.get('', module, 'canActivate')
      .map(config => {
        if (config) {
          return config.value
        } else {
          return '';
        }
      });
  }

  private checkLogin(url: string): boolean {
    var result = this.authService.isTokenExpired();
    if (result) {
      this.router.navigate(['/account/login'], { queryParams: { returnUrl: url } });
    }

    return !result;
  }

  private checkAdmin(url: string): boolean {
    var result = this.checkLogin(url);
    if (result) {
      result = this.authService.getIsAdmin();
    }
    return result;
  }
}