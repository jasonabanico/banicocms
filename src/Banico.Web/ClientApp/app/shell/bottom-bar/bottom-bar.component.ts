import { Component, Inject, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { WindowRefService } from "../../shared/services/windowref.service";
import { AuthService } from "../../shared/services/auth.service";
import { ConfigsService } from "../../shared/services/configs.service";
import { AccountService } from "../../identity/account/services/account.service";
import { AppConfig } from "../../../../Config/app.config";

@Component({
  selector: "app-shell-bottom-bar",
  templateUrl: "./bottom-bar.component.html"
})
export class BottomBarComponent implements OnInit {

  constructor(
    @Inject(WindowRefService) private windowRefService: WindowRefService,
    @Inject(AccountService) private accountService: AccountService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(ConfigsService) private configsService: ConfigsService,
    private location: Location
  ) {
  }

  ngOnInit() {
  }
}
