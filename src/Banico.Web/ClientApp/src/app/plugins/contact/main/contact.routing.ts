import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
import { ContactDisplayComponent } from '../components/contact-display/contact-display.component';
import { ContactFormComponent } from '../components/contact-form/contact-form.component';
import { AuthGuard } from '../../../shared/auth/auth.guard';

const CONTACT_ROUTES: Routes = [
  { path: 'contact', component: ContactComponent, children: [
    { path: 'new', component: ContactFormComponent, canActivate: [AuthGuard] },
    { path: 'edit/:alias', component: ContactFormComponent, canActivate: [AuthGuard] },
    { path: ':alias', component: ContactDisplayComponent, canActivate: [AuthGuard] }
  ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(CONTACT_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class ContactRoutingModule {}