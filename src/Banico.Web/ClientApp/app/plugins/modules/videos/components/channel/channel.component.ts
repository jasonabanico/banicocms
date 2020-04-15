import { Component, OnInit, OnDestroy, Inject, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Channel } from "../../entities/channel";
import { Video } from "../../entities/video";
import { VideosService } from "../../services/videos.service";
import { AuthService } from "../../../../../shared/services/auth.service";
import { ShellService } from "../../../../../shared/services/shell.service";

@Component({
  selector: "app-plugins-videos-channel",
  templateUrl: "./channel.component.html"
})
export class ChannelComponent implements OnInit {
  public channel: Channel;
  public videos: Video[];
  private sub: any;
    public canEdit: boolean;
    public canManageVideos: boolean;

  constructor(
    private videosService: VideosService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private shellService: ShellService
  ) {}

  @ViewChild("deleteModal") deleteModal;

  ngOnInit() {
    this.channel = new Channel(null);
    this.sub = this.route.params.subscribe(params => {
        var alias = params["alias"];
        if (alias) {
            this.videosService.getChannelByAlias(alias).subscribe(channel => {
                this.channel = channel;
                this.shellService.setTitle(this.channel.name);
                const isAdmin = this.authService.isAdmin();
                const userId = this.authService.getUserId();
                if (channel.ownerUserIds.includes(userId) || isAdmin) {
                    this.canEdit = true;
                }
                this.videosService.getVideos(channel.id).subscribe(videos => {
                    this.videos = videos;
                });
            });
        }
    });

    this.authService
        .canAccess("videos-video/manage", "", false)
        .subscribe(result => {
            this.canManageVideos = result;
        });
  }

  edit() {}

  delete() {
    this.deleteModal.show();
  }

  public deleteConfirmed() {
    this.videosService.delete(this.channel.id).subscribe(id => {
      //if (id === this.channel.id) this.deleted.emit(this.channel);
    });
  }
}
