import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { SectionsAdminComponent } from './sections/components/sectionsadmin/sectionsadmin.component';
import { SectionItemsAdminComponent } from './sections/components/sectionitemsadmin/sectionitemsadmin.component';
import { RoleFormComponent } from './roles/components/roleform/roleform.component';
import { RolesListComponent } from './roles/components/roleslist/roleslist.component';
import { UserFormComponent } from './users/components/userform/userform.component';
import { UsersListComponent } from './users/components/userslist/userslist.component';
import { ConfigFormComponent } from './configs/components/configform/configform.component';
import { ConfigsListComponent } from './configs/components/configslist/configslist.component';
import { AuthGuard } from '../shared/auth/auth.guard';

const ADMIN_ROUTES: Routes = [
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'admin/sections/section/:section', component: SectionItemsAdminComponent, canActivate: [AuthGuard] },
    { path: 'admin/sections/:path', component: SectionItemsAdminComponent, canActivate: [AuthGuard] },
    { path: 'admin/sections', component: SectionsAdminComponent, canActivate: [AuthGuard] },
    { path: 'admin/roles/add', component: RoleFormComponent, canActivate: [AuthGuard] },
    { path: 'admin/roles/edit/:id', component: RoleFormComponent, canActivate: [AuthGuard] },
    { path: 'admin/roles', component: RolesListComponent, canActivate: [AuthGuard]},
    { path: 'admin/users/add', component: UserFormComponent, canActivate: [AuthGuard]},
    { path: 'admin/users/edit/:id', component: UserFormComponent, canActivate: [AuthGuard]},
    { path: 'admin/users', component: UsersListComponent, canActivate: [AuthGuard]},
    { path: 'admin/configs/add', component: ConfigFormComponent, canActivate: [AuthGuard]},
    { path: 'admin/configs/edit/:id', component: ConfigFormComponent, canActivate: [AuthGuard]},
    { path: 'admin/configs', component: ConfigsListComponent, canActivate: [AuthGuard]}
    ];

@NgModule({
    imports: [
        RouterModule.forChild(ADMIN_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {}