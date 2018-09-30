import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule }  from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleFormComponent } from '../components/roleform/roleform.component';
import { RolesListComponent } from '../components/roleslist/roleslist.component';
import { RolesService } from './roles.service';

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
