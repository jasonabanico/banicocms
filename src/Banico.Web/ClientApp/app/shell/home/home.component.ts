import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { AppConfig } from "../../../../Config/app.config";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "app-shell-home",
  templateUrl: "../../../../config/home.component.html"
})
export class HomeComponent implements OnInit {
  public appTitle: string;
  public frontText1: string;
  public frontText2: string;
  public startButtons: { Text: string; Url: string; Style: string }[];
  public location: string;
  public content: string;
  public isLoggedIn: boolean;

  readonly SECTION_DELIM: string = "*";

  constructor(private router: Router, private authService: AuthService) {
    this.appTitle = AppConfig.APP_NAME;
    this.frontText1 = AppConfig.FRONT_TEXT_1;
    this.frontText2 = AppConfig.FRONT_TEXT_2;
    this.startButtons = AppConfig.START_BUTTONS;
  }

  ngOnInit() {
    this.location = "";
    this.content = "";
    this.isLoggedIn = this.authService.checkLogin("", false);

    var signedInHomeModule = AppConfig.SIGNED_IN_HOME_MODULE;
    if (signedInHomeModule && this.isLoggedIn) {
      this.router.navigateByUrl(signedInHomeModule);
    }
  }
}
