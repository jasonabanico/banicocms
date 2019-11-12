import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientXsrfModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AdminUsersFormComponent } from "./components/form/form.component";
import { AdminUsersHomeComponent } from "./components/home/home.component";
import { UsersService } from "./services/users.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: "XSRF-TOKEN",
      headerName: "X-XSRF-Token"
    })
  ],
  declarations: [AdminUsersFormComponent, AdminUsersHomeComponent],
  providers: [UsersService],
  bootstrap: []
})
export class AdminUsersModule {}
