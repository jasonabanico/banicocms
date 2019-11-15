import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MarkdownModule } from "ngx-markdown";
import { RichTextModule } from "../rich-text/rich-text.module";
import { ShellModule } from "../../../shell/shell.module";
import { ProfileRoutingModule } from "./profile.routing";
import { ProfileComponent } from "./components/profile.component";
import { ProfileHomeComponent } from "./components/home/home.component";
import { ProfileFormComponent } from "./components/form/form.component";
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
  declarations: [ProfileComponent, ProfileHomeComponent, ProfileFormComponent],
  providers: [ProfileService]
})
export class ProfileModule {}
