import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./components/list.component";
import { ListSetFormComponent } from "./components/list-set-form/list-set-form.component";
import { ListSetDisplayComponent } from "./components/list-set-display/list-set-display.component";
import { ListItemDisplayComponent } from "./components/list-item-display/list-item-display.component";
import { ListItemFormComponent } from "./components/list-item-form/list-item-form.component";
import { ListFormComponent } from "./components/list-form/list-form.component";
import { ListDisplayComponent } from "./components/list-display/list-display.component";
import { AuthGuard } from "../../../shared/auth/auth.guard";

const LIST_ROUTES: Routes = [
  {
    path: "list-set/new",
    component: ListSetFormComponent,
    canActivate: [AuthGuard],
    data: { module: "list-set/manage" }
  },
  {
    path: "list-set/edit/:id",
    component: ListSetFormComponent,
    canActivate: [AuthGuard],
    data: { module: "list-set/manage" }
  },
  {
    path: "list-set/:alias",
    component: ListSetDisplayComponent,
    canActivate: [AuthGuard],
    data: { module: "list-set/view" }
  },
  {
    path: "list-item/new/:listSetId",
    component: ListItemFormComponent,
    canActivate: [AuthGuard],
    data: { module: "list-item/manage" }
  },
  {
    path: "list-item/edit/:id",
    component: ListItemFormComponent,
    canActivate: [AuthGuard],
    data: { module: "list-item/manage" }
  },
  {
    path: "list-item/:alias",
    component: ListItemDisplayComponent,
    canActivate: [AuthGuard],
    data: { module: "list-item/view" }
  },
  {
    path: "list/new/:listSetId",
    component: ListFormComponent,
    canActivate: [AuthGuard],
    data: { module: "list/manage" }
  },
  {
    path: "list/edit/:id",
    component: ListFormComponent,
    canActivate: [AuthGuard],
    data: { module: "list/manage" }
  },
  {
    path: "list/:id",
    component: ListDisplayComponent,
    canActivate: [AuthGuard],
    data: { module: "list/view" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(LIST_ROUTES)],
  exports: [RouterModule]
})
export class ListRoutingModule {}
