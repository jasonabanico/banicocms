import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminSectionsSectionComponent } from './sections/components/section/section.component';
import { AdminSectionsSectionItemComponent } from './sections/components/section-item/section-item.component';
import { RoleFormComponent } from './roles/components/role-form/role-form.component';
import { RolesListComponent } from './roles/components/roles-list/roles-list.component';
import { UserFormComponent } from './users/components/user-form/user-form.component';
import { UsersListComponent } from './users/components/users-list/users-list.component';
import { ConfigFormComponent } from './configs/components/config-form/config-form.component';
import { ConfigsListComponent } from './configs/components/configs-list/configs-list.component';
import { AuthGuard } from '../shared/auth/auth.guard';

const ADMIN_ROUTES: Routes = [
    { path: 'sections/section-item/:section',
        component: AdminSectionsSectionItemComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/sections' }
    },
    { path: 'sections/:path',
        component: AdminSectionsSectionItemComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/sections' }
    },
    { path: 'sections',
        component: AdminSectionsSectionComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/sections' }
    },
    { path: 'roles/add',
        component: RoleFormComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/sections' }
    },
    { path: 'roles/edit/:id',
        component: RoleFormComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/sections' }
    },
    { path: 'roles',
        component: RolesListComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/roles' }
    },
    { path: 'users/add',
        component: UserFormComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/users' }
    },
    { path: 'users/edit/:id',
        component: UserFormComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/users' }
    },
    { path: 'users',
        component: UsersListComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/users' }
    },
    { path: 'configs/add',
        component: ConfigFormComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/configs' }
    },
    { path: 'configs/edit/:id',
        component: ConfigFormComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/configs' }
    },
    { path: 'configs',
        component: ConfigsListComponent,
        canActivate: [AuthGuard],
        data: { module: 'admin/configs' }
    },
    { path: '',
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
