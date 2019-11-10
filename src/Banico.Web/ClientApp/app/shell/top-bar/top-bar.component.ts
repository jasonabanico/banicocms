import { Component, Inject, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { WindowRefService } from "../../shared/services/windowref.service";
import { AuthService } from "../../shared/services/auth.service";
import { ConfigsService } from "../../shared/services/configs.service";
import { AccountService } from "../../identity/account/services/account.service";
import { AppConfig } from "../../../../Config/app.config";

@Component({
  selector: "app-shell-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"]
})
export class TopBarComponent implements OnInit {
  appTitle: string = "";
  domainAsTenant: boolean = false;
  tenant: string = "";
  isExpanded: boolean = false;
  isLoggedIn: boolean = false;
  loggedInAs: string = "";
  avatarHash: string = "";

  constructor(
    @Inject(WindowRefService) private windowRefService: WindowRefService,
    @Inject(AccountService) private accountService: AccountService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(ConfigsService) private configsService: ConfigsService,
    private location: Location
  ) {
    this.appTitle = AppConfig.APP_NAME;
    this.authService.loginDataChanged.subscribe(result => {
      this.updateLogin();
    });
    this.configsService.domainAsTenant().subscribe(result => {
      this.domainAsTenant = result;
      if (this.domainAsTenant) {
        this.tenant = this.authService.getTenant();
      }
    });
  }

  ngOnInit() {
    this.updateLogin();
  }

  updateLogin() {
    this.isLoggedIn = this.authService.hasToken();
    this.loggedInAs = this.authService.getUserName();
    this.avatarHash = this.authService.getAvatarHash();
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

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
