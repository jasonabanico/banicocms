﻿import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent }  from './profile.component';
import { ProfileDisplayComponent } from '../components/profile-display/profile-display.component';
import { ProfileFormComponent } from '../components/profile-form/profile-form.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    ProfileRoutingModule
  ],
  declarations: [ 
    ProfileComponent,
    ProfileDisplayComponent,
    ProfileFormComponent 
  ],
  bootstrap:    [ ProfileComponent ]
})
export class ProfileModule { }