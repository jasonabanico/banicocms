import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';

import { SharedModule }   from '../../shared/modules/shared.module';
import { ManageService }  from './services/manage.service';
import { UserService }  from '../../shared/services/user.service';
import { EmailValidator } from '../../directives/email.validator.directive';

import { ManageRoutingModule }  from './manage.routing';
import { ManageComponent } from './components/manage.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { IndexComponent } from './components/index/index.component';
import { ManageLoginsComponent } from './components/manage-logins/manage-logins.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';

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
    ManageComponent,
    ChangePasswordComponent,
    IndexComponent,
    ManageLoginsComponent,
    SetPasswordComponent
  ],
  providers: [ 
    ManageService,
    UserService
  ],
    bootstrap: [ 
      ManageComponent 
  ]
})
export class ManageModule { }
