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
      .switchMap(
        configValue => {
          console.log(configValue);
          switch (configValue) {
            case '': return Observable.create(true);
            case 'public': return Observable.create(true);
            case 'user': return this.checkLogin(url);
            case 'admin': return this.checkLogin(url);
          }

          return Observable.create(true);
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

  private checkLogin(url: string): Observable<boolean> {
    return this.authService.isLoggedIn()
      .map(result => {
        if (result) {
          return true;
        } else {
          //this.router.navigate(['/account/login'], { queryParams: { returnUrl: url } });
          return false;
        }
      });
  }

  private checkAdmin(url: string): Observable<boolean> {
    return this.checkLogin(url)
      .switchMap(result => {
        if (result) {
          return this.authService.isSuperAdmin();
        }

        return Observable.create(false);
      });
  }
}