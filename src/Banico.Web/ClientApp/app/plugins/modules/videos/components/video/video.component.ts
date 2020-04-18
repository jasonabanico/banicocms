import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Video } from "../../entities/video";
import { VideosService } from "../../services/videos.service";
import { AuthService } from "../../../../../shared/services/auth.service";
import { ShellService } from "../../../../../shared/services/shell.service";
import { EmbedComponent } from "../../../../../shell/embed/embed.component";

@Component({
  selector: "app-plugins-videos-video",
  templateUrl: "./video.component.html"
})
export class VideoComponent implements OnInit {
  public video: Video;
  private sub: any;
  public canEdit: boolean;

  constructor(
    private videosService: VideosService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private shellService: ShellService
  ) {}

  ngOnInit() {
    this.video = new Video(null);
    this.sub = this.route.params.subscribe(params => {
      var id = params["id"];
      this.videosService.getVideo(id).subscribe(video => {
        this.video = video;
        this.shellService.setTitle(this.video.title);
        const isAdmin = this.authService.isAdmin();
        const userId = this.authService.getUserId();
        if (video.ownerUserIds.includes(userId) || isAdmin) {
          this.canEdit = true;
        }
      });
    });
  }
}