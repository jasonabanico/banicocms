import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';
import { ConfigsService } from './configs.service';
import { ConfigFormComponent } from '../components/configform/configform.component';
import { ConfigsListComponent } from '../components/configslist/configslist.component';

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
    ConfigFormComponent,
    ConfigsListComponent
  ],
  providers: [ 
    ConfigsService
  ],
    bootstrap: [ 
  ]
})
export class ConfigsModule { }
