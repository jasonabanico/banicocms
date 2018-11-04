import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileDisplayComponent } from '../components/profile-display/profile-display.component';
import { ProfileFormComponent } from '../components/profile-form/profile-form.component';
import { AuthGuard } from '../../../shared/auth/auth.guard';

const PROFILE_ROUTES: Routes = [
  { path: 'profile', component: ProfileComponent, children: [
    { path: 'edit', component: ProfileFormComponent, canActivate: [AuthGuard] },
    { path: ':alias', component: ProfileDisplayComponent, canActivate: [AuthGuard] },
    { path: '', component: ProfileDisplayComponent, canActivate: [AuthGuard] }
] }
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