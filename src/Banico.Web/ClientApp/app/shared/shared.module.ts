import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigService } from './utils/config.service';
import { WindowRefService } from './services/windowref.service';
import { SectionsService } from './services/sections.service';

@NgModule({
  imports: [ 
      CommonModule 
    ],
  providers: [
    ConfigService,
    SectionsService,
    WindowRefService
    // , { 
    //   provide: HttpXhrBackend, 
    //   useClass: AuthenticateXHRBackend
    // }
  ]
})
export class SharedModule { }