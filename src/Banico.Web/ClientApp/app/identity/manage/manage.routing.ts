import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentityManageComponent } from './components/manage.component';
import { IdentityManageChangePasswordComponent } from './components/change-password/change-password.component';
import { IdentityManageLoginsComponent } from './components/manage-logins/logins.component';
import { IdentityManageSetPasswordComponent } from './components/set-password/set-password.component';
import { IdentityManageHomeComponent } from './components/home/home.component';
import { AuthGuard } from '../../shared/auth/auth.guard';

export const ROUTES: Routes = [
  { path: 'change-password', component: IdentityManageChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'manage-logins', component: IdentityManageLoginsComponent, canActivate: [AuthGuard] },
  { path: 'set-password', component: IdentityManageSetPasswordComponent, canActivate: [AuthGuard] },
  { path: '', component: IdentityManageHomeComponent, canActivate: [AuthGuard] }
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