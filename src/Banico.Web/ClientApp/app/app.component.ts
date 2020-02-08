import { Component } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { AppConfig } from "../../Config/app.config";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";

  public constructor(private titleService: Title, private meta: Meta) {
    this.titleService.setTitle(AppConfig.APP_NAME);
    this.meta.addTag({ name: 'description', content: AppConfig.FRONT_TEXT_1 + " " + AppConfig.FRONT_TEXT_2 });
  }
}
