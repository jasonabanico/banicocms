import { map } from "rxjs/operators";
import { of, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ConfigsService } from "../services/configs.service";
import { Config } from "../../entities/config";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  private debug = false;

  constructor(
    private authService: AuthService,
    private configsService: ConfigsService,
    private router: Router
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const role = route.data["role"] as string;
    if (role) {
      switch (role) {
        case "admin": {
          return new BehaviorSubject<boolean>(this.authService.isAdmin());
        }
        case "superadmin": {
          return new BehaviorSubject<boolean>(this.authService.isSuperAdmin());
        }
      }
    }

    const module = route.data["module"] as string;
    const url: string = state.url;

    if (this.debug) {
      alert(module);
      alert(url);
    }

    return this.authService.canAccess(module, url, true);
  }
}
