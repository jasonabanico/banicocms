import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientXsrfModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AdminSetTenantHomeComponent } from "./components/home/home.component";
import { TenantService } from "./services/tenant.service";

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
  declarations: [AdminSetTenantHomeComponent],
  providers: [TenantService],
  bootstrap: []
})
export class AdminSetTenantModule {}
