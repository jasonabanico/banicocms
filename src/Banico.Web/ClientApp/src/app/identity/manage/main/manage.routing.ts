import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { ManageComponent } from './manage.component';
import { ManageLoginsComponent } from '../components/manage-logins/manage-logins.component';
import { SetPasswordComponent } from '../components/set-password/set-password.component';

import { AuthGuard } from '../../../shared/auth/auth.guard';

export const ROUTES: Routes = [
  { path: 'manage', component: ManageComponent, children: [
    { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
    { path: 'manage-logins', component: ManageLoginsComponent, canActivate: [AuthGuard] },
    { path: 'set-password', component: SetPasswordComponent, canActivate: [AuthGuard] }
  ] }
];

@NgModule({
  imports: [
      RouterModule.forChild(ROUTES)
  ],
  exports: [
      RouterModule
  ]
})
export class ManageRoutingModule {}