import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { SectionsAdminComponent } from './sections/components/sections-admin/sections-admin.component';
import { SectionItemsAdminComponent } from './sections/components/section-items-admin/section-items-admin.component';
import { RoleFormComponent } from './roles/components/role-form/role-form.component';
import { RolesListComponent } from './roles/components/roles-list/roles-list.component';
import { UserFormComponent } from './users/components/user-form/user-form.component';
import { UsersListComponent } from './users/components/users-list/users-list.component';
import { ConfigFormComponent } from './configs/components/config-form/config-form.component';
import { ConfigsListComponent } from './configs/components/configs-list/configs-list.component';
import { AuthGuard } from '../shared/auth/auth.guard';

const ADMIN_ROUTES: Routes = [
    { path: 'admin/sections/section-item/:section',
        component: SectionItemsAdminComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/sections' }
    },
    { path: 'admin/sections/:path',
        component: SectionItemsAdminComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/sections' }
    },
    { path: 'admin/sections',
        component: SectionsAdminComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/sections' }
    },
    { path: 'admin/roles/add',
        component: RoleFormComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/sections' }
    },
    { path: 'admin/roles/edit/:id',
        component: RoleFormComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/sections' }
    },
    { path: 'admin/roles',
        component: RolesListComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/roles' }
    },
    { path: 'admin/users/add',
        component: UserFormComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/users' }
    },
    { path: 'admin/users/edit/:id',
        component: UserFormComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/users' }
    },
    { path: 'admin/users',
        component: UsersListComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/users' }
    },
    { path: 'admin/configs/add',
        component: ConfigFormComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/configs' }
    },
    { path: 'admin/configs/edit/:id',
        component: ConfigFormComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/configs' }
    },
    { path: 'admin/configs',
        component: ConfigsListComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/configs' }
    },
    { path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin' }
    }
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
