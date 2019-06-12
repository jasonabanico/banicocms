import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectoryComponent } from './directory.component';
import { DirectorySearchComponent } from '../components/directory-search/directory-search.component';
import { DirectoryDisplayComponent } from '../components/directory-display/directory-display.component';
import { DirectoryItemDisplayComponent } from '../components/directory-item-display/directory-item-display.component';
import { DirectoryFormComponent } from '../components/directory-form/directory-form.component';
import { DirectoryFrontComponent } from '../components/directory-front/directory-front.component';
import { AuthGuard } from '../../../shared/auth/auth.guard';

const DIRECTORY_ROUTES: Routes = [
    { path: 'new/:path', component: DirectoryFormComponent, canActivate: [AuthGuard], data: { module: 'directory/manage' } },
    { path: 'search/:search', component: DirectorySearchComponent, canActivate: [AuthGuard], data: { module: 'directory/view' } },
    { path: 'item/:id', component: DirectoryItemDisplayComponent, canActivate: [AuthGuard], data: { module: 'directory/view' } },
    { path: 'edit/:id', component: DirectoryFormComponent, canActivate: [AuthGuard], data: { module: 'directory/manage' } },
    { path: ':path', component: DirectoryDisplayComponent, canActivate: [AuthGuard], data: { module: 'directory/view' } },
    { path: '', component: DirectoryFrontComponent, canActivate: [AuthGuard], data: { module: 'directory/view' } },
    { path: '**', component: DirectoryDisplayComponent, canActivate: [AuthGuard], data: { module: 'directory/view' } }
];

@NgModule({
    imports: [
        RouterModule.forChild(DIRECTORY_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class DirectoryRoutingModule {}