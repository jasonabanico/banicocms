import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';

import { SharedModule }   from '../../shared/modules/shared.module';
import { ManageService }  from './services/manage.service';
import { UserService }  from '../../shared/services/user.service';
import { EmailValidator } from '../../directives/email.validator.directive';

import { ManageRoutingModule }  from './manage.routing';
import { IdentityManageComponent } from './components/manage.component';
import { IdentityManageChangePasswordComponent } from './components/change-password/change-password.component';
import { IdentityManageHomeComponent } from './components/home/home.component';
import { IdentityManageLoginsComponent } from './components/manage-logins/logins.component';
import { IdentityManageSetPasswordComponent } from './components/set-password/set-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManageRoutingModule,
    SharedModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-Token'
    })  
  ],
  declarations: [
    IdentityManageComponent,
    IdentityManageChangePasswordComponent,
    IdentityManageHomeComponent,
    IdentityManageLoginsComponent,
    IdentityManageSetPasswordComponent
  ],
  providers: [ 
    ManageService,
    UserService
  ],
    bootstrap: [ 
      IdentityManageComponent 
  ]
})
export class IdentityManageModule { }
