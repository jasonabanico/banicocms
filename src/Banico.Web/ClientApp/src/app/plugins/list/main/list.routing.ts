import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list.component';
import { ListDisplayComponent } from '../components/list-display/list-display.component';
import { ListFormComponent } from '../components/list-form/list-form.component';
import { ListItemDisplayComponent } from '../components/list-item-display/list-item-display.component';
import { ListItemFormComponent } from '../components/list-item-form/list-item-form.component';
import { AuthGuard } from '../../../shared/auth/auth.guard';

const FAQ_ROUTES: Routes = [
  { path: 'list', component: ListComponent, children: [
    { path: 'list-item/new', component: ListItemFormComponent, canActivate: [AuthGuard] },
    { path: 'list-item/edit/:alias', component: ListItemFormComponent, canActivate: [AuthGuard] },
    { path: 'list-item/:alias', component: ListItemDisplayComponent, canActivate: [AuthGuard] },
    { path: 'list/new', component: ListFormComponent, canActivate: [AuthGuard] },
    { path: 'list/edit/:alias', component: ListFormComponent, canActivate: [AuthGuard] },
    { path: 'list/:alias', component: ListDisplayComponent, canActivate: [AuthGuard] },
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
export class ListRoutingModule {}