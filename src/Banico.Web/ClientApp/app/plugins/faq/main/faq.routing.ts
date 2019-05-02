import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaqComponent } from './faq.component';
import { FaqDisplayComponent } from '../components/faq-display/faq-display.component';
import { FaqFormComponent } from '../components//faq-form/faq-form.component';
import { AuthGuard } from '../../../shared/auth/auth.guard';

const FAQ_ROUTES: Routes = [
  { path: 'faq', component: FaqComponent, children: [
    { path: 'new', component: FaqFormComponent, canActivate: [AuthGuard], data: { module: 'faq/manage' } },
    { path: 'edit/:alias', component: FaqFormComponent, canActivate: [AuthGuard], data: { module: 'faq/manage' } },
    { path: ':alias', component: FaqDisplayComponent, canActivate: [AuthGuard], data: { module: 'faq/view' } }
  ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(FAQ_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class FaqRoutingModule {}