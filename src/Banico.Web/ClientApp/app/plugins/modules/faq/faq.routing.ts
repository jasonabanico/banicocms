import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FaqComponent } from "./components/faq.component";
import { FaqListComponent } from "./components/list/list.component";
import { FaqListFormComponent } from "./components/list-form/list-form.component";
import { AuthGuard } from "../../../shared/auth/auth.guard";

const FAQ_ROUTES: Routes = [
  {
    path: "new",
    component: FaqListFormComponent,
    canActivate: [AuthGuard],
    data: { module: "faq/manage" }
  },
  {
    path: "edit/:alias",
    component: FaqListFormComponent,
    canActivate: [AuthGuard],
    data: { module: "faq/manage" }
  },
  {
    path: ":alias",
    component: FaqListComponent,
    canActivate: [AuthGuard],
    data: { module: "faq/view" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(FAQ_ROUTES)],
  exports: [RouterModule]
})
export class FaqRoutingModule {}
