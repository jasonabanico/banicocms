import { Component, Input, Inject, PLATFORM_ID } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { isPlatformBrowser } from "@angular/common";
import { WindowRefService } from "../../shared/services/windowref.service";

@Component({
  selector: "app-shell-embed",
  templateUrl: "./embed.component.html"
})
export class EmbedComponent {
  public platformId: Object;
  public type: string;
  public id: string;
  public tag: string;
  public imgurEmbedCount: number = 0;

  constructor(
    public sanitizer: DomSanitizer,
    @Inject(WindowRefService) private windowRefService: WindowRefService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
  }

  private embeds = [
    {
      site: "youtube",
      regex:
        "(?:https?:/{2})?(?:w{3}.)?youtu(?:be)?.(?:com|be)(?:/watch?v=|/)([^s&]+)",
      index: 1
    },
    {
      site: "imgur",
      regex:
        "(?:https?:/{2})?(?:w{3}.)?imgur.com/(gallery|a)/(.*?)(?:[#/].*|$)",
      index: 2
    },
    {
      site: "instagram",
      regex: "(?:https?:/{2})?(?:w{3}.)?instagram.com/p/(.*?)(?:[#/].*|$)",
      index: 1
    }
  ];

  ngAfterViewChecked() {
    if (isPlatformBrowser(this.platformId)) {
      //Call the update client side only
      for (let i = 0; i < this.imgurEmbedCount; i++) {
        let window = this.windowRefService.nativeWindow;
        if (window) {
          window.imgurEmbed.createIframe();
        }
      }
    }
  }

  @Input()
  set tagId(tagId: string) {
    tagId = tagId.replace("{{", "");
    tagId = tagId.replace("}}", "");

    for (let i = 0; i < this.embeds.length; i++) {
      const embed = this.embeds[i];
      let match = tagId.match(embed.regex);
      if (match) {
        this.tag = embed.site;
        this.id = match[embed.index];

        if (this.tag === "imgur") {
          this.imgurEmbedCount++;
        }
      }
    }
  }
}
