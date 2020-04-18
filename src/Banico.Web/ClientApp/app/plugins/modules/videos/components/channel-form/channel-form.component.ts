import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../../shared/services/auth.service";
import { Channel } from "../../entities/channel";
import { VideosService } from "../../services/videos.service";

@Component({
  selector: "app-plugins-videos-channel-form",
  templateUrl: "./channel-form.component.html",
  providers: [VideosService]
})
export class ChannelFormComponent implements OnInit {
    public channel: Channel = new Channel(null);
    public isSectioned: boolean = false;
    public cancelLink: string;

  private sub: any;
  public channelForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
    alias: ["", Validators.required],
      description: ["", Validators.required],
      sectionItems: [""],
      order: [""]
  });

  public constructor(
    private videosService: VideosService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
      this.cancelLink = "/videos";
  }

  public ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        if (params["alias"]) {
            var alias = params["alias"];
            this.videosService
                .getChannelByAlias(alias)
                .subscribe(channel => this.setChannel(channel));
        }
        var contentSectionItems = params["path"];
        if (contentSectionItems) {
            this.isSectioned = true;
            this.setSection(contentSectionItems);
        }
    });
  }

  public setChannel(channel: Channel) {
    this.channel = channel;
    this.channelForm.patchValue({
      name: channel.name,
      alias: channel.alias,
        description: channel.description,
      order: channel.order
    });
  }

    private setSection(contentSectionItems: string) {
        this.channelForm.patchValue({
            sectionItems: contentSectionItems
        });
        this.cancelLink = "/videos/" + contentSectionItems;
    }

    public save() {
        this.channel.sectionItems = this.channelForm.value["sectionItems"];
    this.channel.name = this.channelForm.value["name"];
        this.channel.alias = this.channelForm.value["alias"];
        this.channel.description = this.channelForm.value["description"];
        this.channel.order = this.channelForm.value["order"];
        this.videosService.addOrUpdateChannel(this.channel).subscribe(
      result => {
                this.router.navigate(["/videos/channel/" + this.channel.alias]);
      }
      //errors =>  this.errors = errors
    );
  }
}
