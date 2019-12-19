import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./shell/home/home.component";

const APP_ROUTES: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "admin",
    loadChildren: "./admin/admin.module#AdminModule"
  },
  {
    path: "manage",
    loadChildren: "./identity/manage/manage.module#IdentityManageModule"
  }

  //,

  // All else fails - go home!
  //{ path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
