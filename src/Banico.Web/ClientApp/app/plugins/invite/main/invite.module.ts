﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InviteRoutingModule } from './invite.routing';
import { InviteComponent }  from './invite.component';
import { InviteFormComponent } from '../components/invite-form/invite-form.component';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    InviteRoutingModule
  ],
  declarations: [ 
    InviteComponent,
    InviteFormComponent 
  ],
  bootstrap:    [ InviteComponent ]
})
export class InviteModule { }
