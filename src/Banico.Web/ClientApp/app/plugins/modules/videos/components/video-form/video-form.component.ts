import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../../shared/services/auth.service";
import { Video } from "../../entities/video";
import { VideosService } from "../../services/videos.service";
import { VideoOEmbedService } from "../../services/video-oembed.service";

@Component({
  selector: "app-plugins-videos-channel-form",
  templateUrl: "./video-form.component.html",
  providers: [VideosService]
})
export class VideoFormComponent implements OnInit {
  public video: Video = new Video(null);
  private sub: any;
  public videoForm: FormGroup = this.fb.group({
    channelId: ["", Validators.required],
    url: ["", Validators.required],
    oEmbed: [""]
  });

  public constructor(
    private videosService: VideosService,
    private videoOembedService: VideoOEmbedService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      var id = params["id"];
      if (id) {
        this.videosService.getVideo(id).subscribe(video => {
          this.setVideo(video);
        });
      }

      var channelId = params["channelId"];
      if (channelId) this.videoForm.patchValue({ channelId: channelId });
    });
  }

  public setVideo(video: Video) {
    this.video = video;
    this.videoForm.patchValue({
      channelId: video.channelId,
      url: video.url
    });
  }

  public save() {
    this.video.channelId = this.videoForm.value["channelId"];
    this.video.url = this.videoForm.value["url"];
    const oEmbed = this.videoForm.value["oEmbed"];

    if (oEmbed != "") {
      const json = JSON.parse(oEmbed);
      this.video = this.videoOembedService.setOEmbedValues(this.video, json);
    }

    //this.videoOembedService.getOEmbed(this.video).then(
    //    video => this.videosService.addOrUpdateVideo(video).subscribe(
    //        result => this.router.navigate(["/videos/video/" + result])
    //        //errors =>  this.errors = errors
    //    )
    //);

    this.videosService.addOrUpdateVideo(this.video).subscribe(
      result => this.router.navigate(["/videos/video/" + result])
      //errors =>  this.errors = errors
    );
  }
}
