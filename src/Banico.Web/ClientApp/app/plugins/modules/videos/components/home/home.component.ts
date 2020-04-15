import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Channel } from "../../entities/channel";
import { VideosService } from "../../services/videos.service";
import { AuthService } from "../../../../../shared/services/auth.service";
import { ConfigsService } from "../../../../../shared/services/configs.service";
import { map } from "rxjs/internal/operators/map";
import { SectionBarService } from "../../../../../shared/services/section-bar.service";
import { ShellService } from "../../../../../shared/services/shell.service";

@Component({
  selector: "app-plugins-videos-home",
  templateUrl: "./home.component.html"
})
export class VideosHomeComponent implements OnInit, OnDestroy {
  private path: string;
  private sub: any;
  public channels: Channel[];
  public canManageVideos: boolean = false;

  constructor(
    @Inject(SectionBarService) private sectionBarService: SectionBarService,
    private configsService: ConfigsService,
    private shellService: ShellService,
    private videosService: VideosService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.channels = new Array();

    this.initializeChannels();

    this.authService.canAccess("videos/manage", "", false).subscribe(result => {
      this.canManageVideos = result;
    });

    this.shellService.setTitle("Videos");
  }

  private initializeChannels() {
    this.sub = this.route.params.subscribe(params => {
      this.path = params["path"];
      this.sectionBarService.initialize(
        "videos",
        this.path,
        "",
        "/videos",
        true
      );

      if (this.path) {
        this.videosService
          .getChannelsBySectionItems(this.path)
          .subscribe(channels => this.setChannels(channels));
      }
    });
  }

  private setChannels(channels: Channel[]) {
    this.channels = channels;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
