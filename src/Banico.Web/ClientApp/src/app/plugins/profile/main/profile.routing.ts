import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileDisplayComponent } from '../components/profiledisplay/profiledisplay.component';
import { ProfileFormComponent } from '../components/profileform/profileform.component';
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