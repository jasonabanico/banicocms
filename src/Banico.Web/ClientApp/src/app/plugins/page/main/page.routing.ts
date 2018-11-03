import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageComponent } from './page.component';
import { PageDisplayComponent } from '../components/pagedisplay/pagedisplay.component';
import { PageFormComponent } from '../components/pageform/pageform.component';
import { AuthGuard } from '../../../shared/auth/auth.guard';

const PAGE_ROUTES: Routes = [
  { path: 'page', component: PageComponent, children: [
    { path: 'new', component: PageFormComponent, canActivate: [AuthGuard] },
    { path: 'edit/:alias', component: PageFormComponent, canActivate: [AuthGuard] },
    { path: ':alias', component: PageDisplayComponent, canActivate: [AuthGuard] }
  ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(PAGE_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class PageRoutingModule {}