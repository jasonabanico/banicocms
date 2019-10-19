import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DirectoryComponent } from "./components/directory.component";
import { DirectorySearchComponent } from "./components/search/search.component";
import { DirectoryListComponent } from "./components/list/list.component";
import { DirectoryItemComponent } from "./components/item/item.component";
import { DirectoryItemFormComponent } from "./components/item-form/item-form.component";
import { DirectoryHomeComponent } from "./components/home/home.component";
import { AuthGuard } from "../../../shared/auth/auth.guard";

const DIRECTORY_ROUTES: Routes = [
  {
    path: "new/:path",
    component: DirectoryItemFormComponent,
    canActivate: [AuthGuard],
    data: { module: "directory/manage" }
  },
  {
    path: "search/:search",
    component: DirectorySearchComponent,
    canActivate: [AuthGuard],
    data: { module: "directory/view" }
  },
  {
    path: "item/:id",
    component: DirectoryItemComponent,
    canActivate: [AuthGuard],
    data: { module: "directory/view" }
  },
  {
    path: "edit/:id",
    component: DirectoryItemFormComponent,
    canActivate: [AuthGuard],
    data: { module: "directory/manage" }
  },
  {
    path: ":path",
    component: DirectoryListComponent,
    canActivate: [AuthGuard],
    data: { module: "directory/view" }
  },
  {
    path: "",
    component: DirectoryHomeComponent,
    canActivate: [AuthGuard],
    data: { module: "directory/view" }
  },
  {
    path: "**",
    component: DirectoryListComponent,
    canActivate: [AuthGuard],
    data: { module: "directory/view" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(DIRECTORY_ROUTES)],
  exports: [RouterModule]
})
export class DirectoryRoutingModule {}
