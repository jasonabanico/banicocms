import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientXsrfModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ConfigsService } from "./services/configs.service";
import { AdminConfigFormComponent } from "./components/form/form.component";
import { AdminConfigHomeComponent } from "./components/home/home.component";

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
  declarations: [AdminConfigFormComponent, AdminConfigHomeComponent],
  providers: [ConfigsService],
  bootstrap: []
})
export class AdminConfigModule {}
