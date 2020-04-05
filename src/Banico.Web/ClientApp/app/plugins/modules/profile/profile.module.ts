import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShellModule } from "../../../shell/shell.module";
import { ProfileRoutingModule } from "./profile.routing";
import { ProfileComponent } from "./components/profile.component";
import { ProfileHomeComponent } from "./components/home/home.component";
import { OrganizationViewComponent } from "./components/organization-view/organization-view.component";
import { OrganizationFormComponent } from "./components/organization-form/organization-form.component";
import { PersonViewComponent } from "./components/person-view/person-view.component";
import { PersonFormComponent } from "./components/person-form/person-form.component";
import { ProfileService } from "./services/profile.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    ShellModule
  ],
  declarations: [
    ProfileComponent,
    ProfileHomeComponent,
    OrganizationFormComponent,
    OrganizationViewComponent,
    PersonFormComponent,
    PersonViewComponent
  ],
  providers: [ProfileService]
})
export class ProfileModule {}
