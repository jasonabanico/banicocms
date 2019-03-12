import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinksComponent } from './components/links.component';
import { LinkFormComponent } from './components/link-form/link-form.component';
import { LinkListComponent } from './components/link-list/link-list.component';
import { AuthGuard } from '../../shared/auth/auth.guard';

const LINKS_ROUTES: Routes = [
  { path: 'links', component: LinksComponent, children: [
    { path: 'new/:path', component: LinkFormComponent, canActivate: [AuthGuard], data: { module: 'link/manage' } },
    { path: 'edit/:id', component: LinkFormComponent, canActivate: [AuthGuard], data: { module: 'link/manage' } },
    { path: ':path', component: LinkListComponent, canActivate: [AuthGuard], data: { module: 'link/view' } },
    { path: '', component: LinkListComponent, canActivate: [AuthGuard], data: { module: 'link/view' } },
    { path: '**', component: LinkListComponent, canActivate: [AuthGuard], data: { module: 'link/view' } }
  ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(LINKS_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class LinksRoutingModule {}
