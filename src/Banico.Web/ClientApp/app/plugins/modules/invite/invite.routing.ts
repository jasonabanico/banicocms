import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { InviteComponent } from "./components/invite.component";
import { InviteFormComponent } from "./components/form/form.component";
import { AuthGuard } from "../../../shared/auth/auth.guard";

const INVITE_ROUTES: Routes = [
  {
    path: "",
    component: InviteFormComponent,
    canActivate: [AuthGuard],
    data: { module: "invite" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(INVITE_ROUTES)],
  exports: [RouterModule]
})
export class InviteRoutingModule {}
