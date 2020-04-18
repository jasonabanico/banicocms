import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { VideosComponent } from "./components/videos.component";
import { VideosHomeComponent } from "./components/home/home.component";
import { ChannelComponent } from "./components/channel/channel.component";
import { ChannelFormComponent } from "./components/channel-form/channel-form.component";
import { VideoComponent } from "./components/video/video.component";
import { VideoFormComponent } from "./components/video-form/video-form.component";
import { AuthGuard } from "../../../shared/auth/auth.guard";

const VIDEOS_ROUTES: Routes = [
  {
    path: "videos",
    component: VideosComponent,
    children: [
    {
            path: "channel/new",
            component: ChannelFormComponent,
        canActivate: [AuthGuard],
            data: { module: "videos-channel/manage" }
    },
      {
        path: "channel/new/:path",
        component: ChannelFormComponent,
        canActivate: [AuthGuard],
        data: { module: "videos-channel/manage" }
      },
      {
        path: "channel/edit/:alias",
        component: ChannelFormComponent,
        canActivate: [AuthGuard],
        data: { module: "videos-channel/manage" }
      },
        {
            path: "channel/:alias",
            component: ChannelComponent,
            canActivate: [AuthGuard],
            data: { module: "videos-channel/view" }
        },
        {
            path: "video/new/:channelId",
            component: VideoFormComponent,
            canActivate: [AuthGuard],
            data: { module: "videos-video/manage" }
        },
        {
            path: "video/edit/:id",
            component: VideoFormComponent,
            canActivate: [AuthGuard],
            data: { module: "videos-video/manage" }
        },
      {
        path: "video/:id",
        component: VideoComponent,
        canActivate: [AuthGuard],
        data: { module: "videos-video/view" }
      },
      {
        path: ":path",
        component: VideosHomeComponent,
        canActivate: [AuthGuard],
        data: { module: "videos-home/view" }
      },
      {
        path: "",
        component: VideosHomeComponent,
        canActivate: [AuthGuard],
        data: { module: "videos-home/view" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(VIDEOS_ROUTES)],
  exports: [RouterModule]
})
export class VideosRoutingModule {}
