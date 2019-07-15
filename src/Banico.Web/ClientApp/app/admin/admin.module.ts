import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin/admin.component';
import { RolesModule } from './roles/main/roles.module';
import { SectionsModule } from './sections/main/sections.module';
import { UsersModule } from './users/main/users.module';
import { ConfigsModule } from './configs/main/configs.module';

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
        AdminComponent
    ]
})
export class AdminModule { }