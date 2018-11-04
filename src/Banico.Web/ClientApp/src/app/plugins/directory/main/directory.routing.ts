import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectoryComponent } from './directory.component';
import { DirectorySearchComponent } from '../components/directory-search/directory-search.component';
import { DirectoryDisplayComponent } from '../components/directory-display/directory-display.component';
import { DirectoryItemDisplayComponent } from '../components/directory-item-display/directory-item-display.component';
import { DirectoryFormComponent } from '../components/directory-form/directory-form.component';
import { DirectoryFrontComponent } from '../components/directory-front/directory-front.component';
import { AuthGuard } from '../../../shared/auth/auth.guard';

const LIST_ROUTES: Routes = [
  { path: 'directory', component: DirectoryComponent, children: [
    { path: 'new/:path', component: DirectoryFormComponent, canActivate: [AuthGuard] },
    { path: 'search/:search', component: DirectorySearchComponent, canActivate: [AuthGuard] },
    { path: 'item/:id', component: DirectoryItemDisplayComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: DirectoryFormComponent, canActivate: [AuthGuard] },
    { path: ':path', component: DirectoryDisplayComponent, canActivate: [AuthGuard] },
    { path: '', component: DirectoryFrontComponent, canActivate: [AuthGuard] }, 
    { path: '**', component: DirectoryDisplayComponent, canActivate: [AuthGuard] }
] }
];

@NgModule({
    imports: [
        RouterModule.forChild(LIST_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class DirectoryRoutingModule {}