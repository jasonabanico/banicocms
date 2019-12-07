import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../../../shared/auth/auth.guard";
import { ForumSubforumFormComponent } from "./components/subforum-form/subforum-form.component";
import { ForumSubforumComponent } from "./components/subforum/subforum.component";
import { ForumTopicFormComponent } from "./components/topic-form/topic-form.component";
import { ForumTopicComponent } from "./components/topic/topic.component";
import { ForumHomeComponent } from "./components/home/home.component";

const FORUM_ROUTES: Routes = [
  {
    path: "sub/new",
    component: ForumSubforumFormComponent,
    canActivate: [AuthGuard],
    data: { module: "forum-subforum/manage" }
  },
  {
    path: "sub/new/:path",
    component: ForumSubforumFormComponent,
    canActivate: [AuthGuard],
    data: { module: "forum-subforum/manage" }
  },
  {
    path: "sub/edit/:id",
    component: ForumSubforumFormComponent,
    canActivate: [AuthGuard],
    data: { module: "forum-subforum/manage" }
  },
  {
    path: "sub/:alias",
    component: ForumSubforumComponent,
    canActivate: [AuthGuard],
    data: { module: "forum-subforum/view" }
  },
  {
    path: "sub/:alias/:path",
    component: ForumSubforumComponent,
    canActivate: [AuthGuard],
    data: { module: "forum-subforum/view" }
  },
  {
    path: "topic/new/:subforumId",
    component: ForumTopicFormComponent,
    canActivate: [AuthGuard],
    data: { module: "forum-topic/manage" }
  },
  {
    path: "topic/edit/:id",
    component: ForumTopicFormComponent,
    canActivate: [AuthGuard],
    data: { module: "forum-topic/manage" }
  },
  {
    path: "topic/:id",
    component: ForumTopicComponent,
    canActivate: [AuthGuard],
    data: { module: "forum-topic/view" }
  },
  {
    path: ":path",
    component: ForumHomeComponent,
    canActivate: [AuthGuard],
    data: { module: "forum-home/view" }
  },
  {
    path: "",
    component: ForumHomeComponent,
    canActivate: [AuthGuard],
    data: { module: "forum-home/view" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(FORUM_ROUTES)],
  exports: [RouterModule]
})
export class ForumRoutingModule {}
