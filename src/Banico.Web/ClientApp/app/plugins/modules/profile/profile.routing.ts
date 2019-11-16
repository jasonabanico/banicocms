import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileComponent } from "./components/profile.component";
import { ProfileHomeComponent } from "./components/home/home.component";
import { ProfileFormComponent } from "./components/form/form.component";
import { AuthGuard } from "../../../shared/auth/auth.guard";

const PROFILE_ROUTES: Routes = [
  {
    path: "edit/:type/:alias",
    component: ProfileFormComponent,
    canActivate: [AuthGuard],
    data: { module: "profile/manage" }
  },
  {
    path: ":type/:alias",
    component: ProfileHomeComponent,
    canActivate: [AuthGuard],
    data: { module: "profile/view" }
  },
  {
    path: "",
    component: ProfileHomeComponent,
    canActivate: [AuthGuard],
    data: { module: "profile/manage" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(PROFILE_ROUTES)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
