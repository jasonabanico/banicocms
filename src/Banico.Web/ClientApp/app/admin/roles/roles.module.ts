import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { RolesService } from './services/roles.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-Token'
    })  
  ],
  declarations: [
    RoleFormComponent,
    RolesListComponent
  ],
  providers: [ 
    RolesService
  ],
    bootstrap: [ 
  ]
})
export class RolesModule { }
