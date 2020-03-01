import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileComponent } from "./components/profile.component";
import { PersonViewComponent } from "./components/person-view/person-view.component";
import { PersonFormComponent } from "./components/person-form/person-form.component";
import { OrganizationViewComponent } from "./components/organization-view/organization-view.component";
import { OrganizationFormComponent } from "./components/organization-form/organization-form.component";
import { ProfileHomeComponent } from "./components/home/home.component";
import { AuthGuard } from "../../../shared/auth/auth.guard";

const PROFILE_ROUTES: Routes = [
  {
    path: "new/org/:path",
    component: OrganizationFormComponent,
    canActivate: [AuthGuard],
    data: { module: "profile-org/manage" }
  },
  {
    path: "edit/in/:alias",
    component: PersonFormComponent,
    canActivate: [AuthGuard],
    data: { module: "profile-in/manage" }
  },
  {
    path: "edit/org/:alias",
    component: OrganizationFormComponent,
    canActivate: [AuthGuard],
    data: { module: "profile-org/manage" }
  },
  {
    path: "in/:alias",
    component: PersonViewComponent,
    canActivate: [AuthGuard],
    data: { module: "profile/view" }
  },
  {
    path: "org/:alias",
    component: OrganizationViewComponent,
    canActivate: [AuthGuard],
    data: { module: "profile/view" }
  },
  {
    path: ":path",
    component: ProfileHomeComponent,
    canActivate: [AuthGuard],
    data: { module: "profile-home/view" }
  },
  {
    path: "",
    component: ProfileHomeComponent,
    canActivate: [AuthGuard],
    data: { module: "profile-home/view" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(PROFILE_ROUTES)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
