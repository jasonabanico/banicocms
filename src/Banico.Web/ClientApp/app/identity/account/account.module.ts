import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';

import { SharedModule }   from '../../shared/modules/shared.module';
import { AccountService }  from './services/account.service';
import { UserService }  from '../../shared/services/user.service';
import { EmailValidator } from '../../directives/email.validator.directive';

import { AccountRoutingModule }  from './account.routing';
import { IdentityAccountComponent } from './components/account.component';
import { IdentityAccountConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { IdentityAccountLoginComponent } from './components/login/login.component';
import { IdentityAccountRegisterComponent } from './components/register/register.component';
import { IdentityAccountResendConfirmationComponent } from './components/resend-confirmation/resend-confirmation.component';
import { IdentityAccountResetPasswordComponent } from './components/reset-password/reset-password.component';
import { IdentityAccountForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    SharedModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-Token'
    }),
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    IdentityAccountComponent,
    IdentityAccountConfirmEmailComponent,
    IdentityAccountLoginComponent, 
    IdentityAccountRegisterComponent, 
    IdentityAccountResendConfirmationComponent,
    IdentityAccountResetPasswordComponent,
    IdentityAccountForgotPasswordComponent,
  ],
  providers: [ 
    AccountService,
    UserService
  ],
    bootstrap: [ 
      IdentityAccountComponent 
  ]
})
export class IdentityAccountModule { }
