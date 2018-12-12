import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/auth/auth.guard';

const FORUM_ROUTES: Routes = [
//   { path: 'forum', component: ForumComponent, children: [
//     { path: 'list-set/new', component: ListSetFormComponent, canActivate: [AuthGuard], data: { module: 'list-set/manage' } },
//     { path: 'list-set/edit/:id', component: ListSetFormComponent, canActivate: [AuthGuard], data: { module: 'list-set/manage' } },
//     { path: 'list-set/:alias', component: ListSetDisplayComponent, canActivate: [AuthGuard], data: { module: 'list-set/view' } },
//     { path: 'list-item/new/:listSetId', component: ListItemFormComponent, canActivate: [AuthGuard], data: { module: 'list-item/manage' } },
//     { path: 'list-item/edit/:id', component: ListItemFormComponent, canActivate: [AuthGuard], data: { module: 'list-item/manage' } },
//     { path: 'list-item/:alias', component: ListItemDisplayComponent, canActivate: [AuthGuard], data: { module: 'list-item/view' } },
//     { path: 'list/new/:listSetId', component: ListFormComponent, canActivate: [AuthGuard], data: { module: 'list/manage' } },
//     { path: 'list/edit/:id', component: ListFormComponent, canActivate: [AuthGuard], data: { module: 'list/manage' } },
//     { path: 'list/:id', component: ListDisplayComponent, canActivate: [AuthGuard], data: { module: 'list/view' } },
//   ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(FORUM_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class ForumRoutingModule {}