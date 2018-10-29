import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';
import { ConfigsService } from './configs.service';
import { ConfigFormComponent } from '../components/configform/configform.component';
import { ConfigListComponent } from '../components/configlist/configlist.component';

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
    ConfigListComponent
  ],
  providers: [ 
    ConfigsService
  ],
    bootstrap: [ 
  ]
})
export class ConfigsModule { }
