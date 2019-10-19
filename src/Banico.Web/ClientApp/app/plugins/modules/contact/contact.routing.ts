import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ContactComponent } from "./components/contact.component";
import { ContactFormComponent } from "./components/form/form.component";
import { ContactFormBuilderComponent } from "./components/form-builder/form-builder.component";
import { AuthGuard } from "../../../shared/auth/auth.guard";

const CONTACT_ROUTES: Routes = [
  {
    path: "new",
    component: ContactFormBuilderComponent,
    canActivate: [AuthGuard],
    data: { module: "contact/manage" }
  },
  {
    path: "edit/:alias",
    component: ContactFormBuilderComponent,
    canActivate: [AuthGuard],
    data: { module: "contact/manage" }
  },
  {
    path: ":alias",
    component: ContactFormComponent,
    canActivate: [AuthGuard],
    data: { module: "contact/view" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(CONTACT_ROUTES)],
  exports: [RouterModule]
})
export class ContactRoutingModule {}
