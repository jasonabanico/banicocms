import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PipesModule } from "../pipes/pipes.module";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { HomeComponent } from "./home/home.component";
import { ModalComponent } from "./modal/modal.component";
import { SectionBarComponent } from "./section-bar/section-bar.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { BottomBarComponent } from "./bottom-bar/bottom-bar.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { AuthService } from "../shared/services/auth.service";

@NgModule({
  imports: [CommonModule, PipesModule, MDBBootstrapModule.forRoot()],
  declarations: [
    HomeComponent,
    ModalComponent,
    SectionBarComponent,
    TopBarComponent,
    BottomBarComponent,
    SpinnerComponent
  ],
  exports: [
    ModalComponent,
    SectionBarComponent,
    TopBarComponent,
    BottomBarComponent
  ],
  providers: [AuthService]
})
export class ShellModule {}
