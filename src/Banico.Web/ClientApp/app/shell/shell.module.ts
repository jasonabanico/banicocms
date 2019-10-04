import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './modal/modal.component';
import { SectionBarComponent } from './section-bar/section-bar.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SectionBarService } from './section-bar/section-bar.service';
import { AuthService } from '../shared/services/auth.service';

@NgModule({
    imports: [ 
        CommonModule,
        PipesModule
    ],
    declarations: [ 
        HomeComponent,
        ModalComponent,
        SectionBarComponent,
        NavMenuComponent,
        SpinnerComponent,
    ],
    exports: [
        SectionBarComponent,
        NavMenuComponent
    ],
    providers: [
        SectionBarService,
        AuthService
    ]
})
export class ShellModule { }