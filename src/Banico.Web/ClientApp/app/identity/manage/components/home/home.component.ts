import { Component, Inject } from "@angular/core";

import { UserService } from "../../../../shared/services/user.service";
import { Router } from "@angular/router";
import { WindowRefService } from "../../../../shared/services/windowref.service";
import { AccountService } from "../../../account/services/account.service";
import { AuthService } from "../../../../shared/services/auth.service";

@Component({
  selector: "app-identity-manage-home",
  templateUrl: "./home.component.html",
  styleUrls: []
})
export class IdentityManageHomeComponent {
  public username: string;

  constructor(
    @Inject(WindowRefService) private windowRefService: WindowRefService,
    @Inject(AccountService) private accountService: AccountService,
    @Inject(AuthService) private authService: AuthService
  ) {
    this.username = authService.getUserName();
  }

  logout() {
    this.accountService.logout().subscribe(
      data => {
        this.authService.removeToken();
        this.windowRefService.nativeWindow.location.reload();
      },
      error => {
        this.authService.removeToken();
        this.windowRefService.nativeWindow.location.reload();
      }
    );
  }
}
