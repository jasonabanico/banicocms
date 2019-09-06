import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

import { AdminRoutingModule } from './admin.routing';
import { AdminHomeComponent } from './home/home.component';
import { RolesModule } from './roles/roles.module';
import { SectionsModule } from './sections/sections.module';
import { UsersModule } from './users/users.module';
import { ConfigsModule } from './configs/configs.module';

@NgModule({
    imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        RolesModule,
        SectionsModule,
        UsersModule,
        ConfigsModule
    ],
    declarations: [ 
        AdminHomeComponent
    ]
})
export class AdminModule { }