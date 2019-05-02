import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontComponent } from './front.component';
import { AuthGuard } from '../../shared/auth/auth.guard';

const SECTION_ROUTES: Routes = [
    { path: 'front', component: FrontComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(SECTION_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class FrontRoutingModule {}