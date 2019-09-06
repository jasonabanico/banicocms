import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';
import { RolesFormComponent } from './components/form/form.component';
import { RolesHomeComponent } from './components/home/home.component';
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
    RolesFormComponent,
    RolesHomeComponent
  ],
  providers: [ 
    RolesService
  ],
    bootstrap: [ 
  ]
})
export class RolesModule { }
