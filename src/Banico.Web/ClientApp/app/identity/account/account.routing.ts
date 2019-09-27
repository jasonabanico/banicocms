import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentityAccountComponent } from './components/account.component';
import { IdentityAccountConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { IdentityAccountForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { IdentityAccountLoginComponent } from './components/login/login.component';
import { IdentityAccountRegisterComponent } from './components/register/register.component';
import { IdentityAccountResendConfirmationComponent } from './components/resend-confirmation/resend-confirmation.component';
import { IdentityAccountResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from '../../shared/auth/auth.guard';

export const ROUTES: Routes = [
  { path: 'account', component: IdentityAccountComponent, children: [
    { path: 'confirm-email', component: IdentityAccountConfirmEmailComponent },
    { path: 'forgot-password', component: IdentityAccountForgotPasswordComponent },
    { path: 'login', component: IdentityAccountLoginComponent },
    { path: 'register', component: IdentityAccountRegisterComponent },
    { path: 'resend-confirmation', component: IdentityAccountResendConfirmationComponent },
    { path: 'reset-password', component: IdentityAccountResetPasswordComponent }  
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