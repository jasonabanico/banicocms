import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';
import { ConfigsService } from './services/configs.service';
import { ConfigFormComponent } from './components/config-form/config-form.component';
import { ConfigsListComponent } from './components/configs-list/configs-list.component';

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
