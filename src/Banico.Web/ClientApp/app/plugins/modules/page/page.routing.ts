import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PageComponent } from "./components/page.component";
import { PageItemComponent } from "./components/item/item.component";
import { PageFormComponent } from "./components/form/form.component";
import { AuthGuard } from "../../../shared/auth/auth.guard";

const PAGE_ROUTES: Routes = [
  {
    path: "new",
    component: PageFormComponent,
    canActivate: [AuthGuard],
    data: { module: "page/manage" }
  },
  {
    path: "edit/:alias",
    component: PageFormComponent,
    canActivate: [AuthGuard],
    data: { module: "page/manage" }
  },
  {
    path: ":alias",
    component: PageItemComponent,
    canActivate: [AuthGuard],
    data: { module: "page/view" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(PAGE_ROUTES)],
  exports: [RouterModule]
})
export class PageRoutingModule {}
