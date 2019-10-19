import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LinksComponent } from "./components/links.component";
import { LinksFormComponent } from "./components/form/form.component";
import { LinksListComponent } from "./components/list/list.component";
import { AuthGuard } from "../../../shared/auth/auth.guard";

const LINKS_ROUTES: Routes = [
  {
    path: "links",
    component: LinksComponent,
    children: [
      {
        path: "new/:path",
        component: LinksFormComponent,
        canActivate: [AuthGuard],
        data: { module: "link/manage" }
      },
      {
        path: "edit/:id",
        component: LinksFormComponent,
        canActivate: [AuthGuard],
        data: { module: "link/manage" }
      },
      {
        path: ":path",
        component: LinksListComponent,
        canActivate: [AuthGuard],
        data: { module: "link/view" }
      },
      {
        path: "",
        component: LinksListComponent,
        canActivate: [AuthGuard],
        data: { module: "link/view" }
      },
      {
        path: "**",
        component: LinksListComponent,
        canActivate: [AuthGuard],
        data: { module: "link/view" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(LINKS_ROUTES)],
  exports: [RouterModule]
})
export class LinksRoutingModule {}
