import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MarkdownModule } from "ngx-markdown";
import { RichTextModule } from "../rich-text/rich-text.module";
import { ShellModule } from "../../../shell/shell.module";
import { ProfileRoutingModule } from "./profile.routing";
import { ProfileComponent } from "./components/profile.component";
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
    MarkdownModule.forChild(),
    RichTextModule,
    ShellModule
  ],
  declarations: [
    ProfileComponent,
    OrganizationFormComponent,
    OrganizationViewComponent,
    PersonFormComponent,
    PersonViewComponent
  ],
  providers: [ProfileService]
})
export class ProfileModule {}
