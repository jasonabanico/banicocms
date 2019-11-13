import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PipesModule } from "../pipes/pipes.module";

import { AdminRoutingModule } from "./admin.routing";
import { AdminHomeComponent } from "./home/home.component";
import { AdminSetTenantModule } from "./set-tenant/set-tenant.module";
import { AdminRolesModule } from "./roles/roles.module";
import { AdminSectionsModule } from "./sections/sections.module";
import { AdminUsersModule } from "./users/users.module";
import { AdminConfigModule } from "./config/configs.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    AdminSetTenantModule,
    AdminRolesModule,
    AdminSectionsModule,
    AdminUsersModule,
    AdminConfigModule
  ],
  declarations: [AdminHomeComponent]
})
export class AdminModule {}
