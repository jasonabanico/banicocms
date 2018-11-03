import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { ConfirmEmailComponent } from '../components/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ResendConfirmationComponent } from '../components/resend-confirmation/resend-confirmation.component';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { AuthGuard } from '../../../shared/auth/auth.guard';

export const ROUTES: Routes = [
  { path: 'account', component: AccountComponent, children: [
    { path: 'confirm-email', component: ConfirmEmailComponent, canActivate: [AuthGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'resend-confirmation', component: ResendConfirmationComponent, canActivate: [AuthGuard] },
    { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] }
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
export class AccountRoutingModule {}