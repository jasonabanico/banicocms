import { Injectable } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { AppConfig } from "../../../../Config/app.config";

@Injectable()
export class ShellService {
  public constructor(private titleService: Title, private meta: Meta) {}

  public setTitle(title: string) {
    this.titleService.setTitle(title + " | " + AppConfig.APP_NAME);
  }

  public setMetaDescription(description: string) {
    this.meta.addTag({ name: "description", content: description });
  }
}
