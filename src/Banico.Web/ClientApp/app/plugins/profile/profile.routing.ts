import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './components/profile.component';
import { ProfileDisplayComponent } from './components/profile-display/profile-display.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { AuthGuard } from '../../shared/auth/auth.guard';

const PROFILE_ROUTES: Routes = [
    { path: 'edit', component: ProfileFormComponent, canActivate: [AuthGuard], data: { module: 'profile/manage' } },
    { path: ':alias', component: ProfileDisplayComponent, canActivate: [AuthGuard], data: { module: 'profile/manage' } },
    { path: '', component: ProfileDisplayComponent, canActivate: [AuthGuard], data: { module: 'profile/view' } }
];

@NgModule({
    imports: [
        RouterModule.forChild(PROFILE_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileRoutingModule {}