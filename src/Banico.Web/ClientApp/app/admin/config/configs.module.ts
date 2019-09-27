import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';
import { ConfigsService } from './services/configs.service';
import { AdminConfigFormComponent } from './components/form/form.component';
import { AdminConfigListComponent } from './components/list/list.component';

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
    AdminConfigFormComponent,
    AdminConfigListComponent
  ],
  providers: [ 
    ConfigsService
  ],
    bootstrap: [ 
  ]
})
export class AdminConfigModule { }
