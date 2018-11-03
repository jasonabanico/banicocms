import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list.component';
import { ListDisplayComponent } from '../components/listdisplay/listdisplay.component';
import { ListFormComponent } from '../components/listform/listform.component';
import { ListItemDisplayComponent } from '../components/listitemdisplay/listitemdisplay.component';
import { ListItemFormComponent } from '../components/listitemform/listitemform.component';
import { AuthGuard } from '../../../shared/auth/auth.guard';

const FAQ_ROUTES: Routes = [
  { path: 'list', component: ListComponent, children: [
    { path: 'listitem/new', component: ListItemFormComponent, canActivate: [AuthGuard] },
    { path: 'listitem/edit/:alias', component: ListItemFormComponent, canActivate: [AuthGuard] },
    { path: 'listitem/:alias', component: ListItemDisplayComponent, canActivate: [AuthGuard] },
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