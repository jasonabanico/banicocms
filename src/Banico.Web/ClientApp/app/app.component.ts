import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AppConfig } from "../../Config/app.config";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";

  public constructor(private titleService: Title) {
    this.titleService.setTitle(AppConfig.APP_NAME);
  }
}
