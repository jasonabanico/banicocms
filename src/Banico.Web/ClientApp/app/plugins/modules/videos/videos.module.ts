import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShellModule } from "../../../shell/shell.module";
import { VideosRoutingModule } from "./videos.routing";
import { VideosComponent } from "./components/videos.component";
import { VideosHomeComponent } from "./components/home/home.component";
import { ChannelComponent } from "./components/channel/channel.component";
import { ChannelFormComponent } from "./components/channel-form/channel-form.component";
import { VideoComponent } from "./components/video/video.component";
import { VideoFormComponent } from "./components/video-form/video-form.component";
import { VideosService } from "./services/videos.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VideosRoutingModule,
    ShellModule
  ],
  declarations: [
    VideosComponent,
    VideosHomeComponent,
    ChannelComponent,
    ChannelFormComponent,
    VideoComponent,
    VideoFormComponent
  ],
  providers: [VideosService]
})
export class VideosModule {}
