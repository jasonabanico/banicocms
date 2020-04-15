import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientXsrfModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { AdminRolesFormComponent } from "./components/form/form.component";
import { AdminRolesHomeComponent } from "./components/home/home.component";
import { RolesService } from "./services/roles.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientXsrfModule.withOptions({
      cookieName: "XSRF-TOKEN",
      headerName: "X-XSRF-Token"
    })
  ],
  declarations: [AdminRolesFormComponent, AdminRolesHomeComponent],
  providers: [RolesService],
  bootstrap: []
})
export class AdminRolesModule {}
