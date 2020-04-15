import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { PipesModule } from "../pipes/pipes.module";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { HomeComponent } from "./home/home.component";
import { ModalComponent } from "./modal/modal.component";
import { SectionBarComponent } from "./section-bar/section-bar.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { BottomBarComponent } from "./bottom-bar/bottom-bar.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { MarkdownModule } from "ngx-markdown";
import { EmbedComponent } from "./embed/embed.component";
import { RichTextComponent } from "./rich-text/rich-text.component";
import { AuthService } from "../shared/services/auth.service";

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule,
    MDBBootstrapModule.forRoot(),
    MarkdownModule.forChild()
  ],
  declarations: [
    HomeComponent,
    ModalComponent,
    SectionBarComponent,
    TopBarComponent,
    BottomBarComponent,
    SpinnerComponent,
    EmbedComponent,
    RichTextComponent
  ],
  exports: [
    ModalComponent,
    SectionBarComponent,
    TopBarComponent,
    BottomBarComponent,
    EmbedComponent,
    RichTextComponent
  ],
  providers: [AuthService]
})
export class ShellModule {}
