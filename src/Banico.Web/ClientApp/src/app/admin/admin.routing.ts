import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { SectionsAdminComponent } from './sections/components/sectionsadmin/sectionsadmin.component';
import { SectionItemsAdminComponent } from './sections/components/sectionitemsadmin/sectionitemsadmin.component';
import { RoleFormComponent } from './roles/components/roleform/roleform.component';
import { RolesListComponent } from './roles/components/roleslist/roleslist.component';
import { UserFormComponent } from './users/components/userform/userform.component';
import { UsersListComponent } from './users/components/userslist/userslist.component';

const ADMIN_ROUTES: Routes = [
    { path: 'admin', component: AdminComponent },
    { path: 'admin/sections/section/:section', component: SectionItemsAdminComponent },
    { path: 'admin/sections/:path', component: SectionItemsAdminComponent },
    { path: 'admin/sections', component: SectionsAdminComponent },
    { path: 'admin/roles/add', component: RoleFormComponent},
    { path: 'admin/roles/edit/:id', component: RoleFormComponent},
    { path: 'admin/roles', component: RolesListComponent},
    { path: 'admin/users/add', component: UserFormComponent},
    { path: 'admin/users/edit/:id', component: UserFormComponent},
    { path: 'admin/users', component: UsersListComponent}];

@NgModule({
    imports: [
        RouterModule.forChild(ADMIN_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {}