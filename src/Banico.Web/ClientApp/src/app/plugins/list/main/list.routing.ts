import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list.component';
import { ListDisplayComponent } from '../components/listdisplay/listdisplay.component';
import { ListFormComponent } from '../components/listform/listform.component';
import { ListItemDisplayComponent } from '../components/listitemdisplay/listitemdisplay.component';
import { ListItemFormComponent } from '../components/listitemform/listitemform.component';

const FAQ_ROUTES: Routes = [
  { path: 'list', component: ListComponent, children: [
    { path: 'listitem/new', component: ListItemFormComponent },
    { path: 'listitem/edit/:alias', component: ListItemFormComponent },
    { path: 'listitem/:alias', component: ListItemDisplayComponent },
    { path: 'list/new', component: ListFormComponent },
    { path: 'list/edit/:alias', component: ListFormComponent },
    { path: 'list/:alias', component: ListDisplayComponent },
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