import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/auth/auth.guard';
import { ForumComponent } from './components/forum.component';
import { SubforumFormComponent } from './components/subforum-form/subforum-form.component';
import { SubforumComponent } from './components/subforum/subforum.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { TopicComponent } from './components/topic/topic.component';

const FORUM_ROUTES: Routes = [
    { path: 'subforum/new', component: SubforumFormComponent, canActivate: [AuthGuard], data: { module: 'subforum/manage' } },
    { path: 'subforum/edit/:id', component: SubforumFormComponent, canActivate: [AuthGuard], data: { module: 'subforum/manage' } },
    { path: 'subforum/:alias', component: SubforumComponent, canActivate: [AuthGuard], data: { module: 'subforum/view' } },
    { path: 'topic/new/:subforumId', component: TopicFormComponent, canActivate: [AuthGuard], data: { module: 'topic/manage' } },
    { path: 'topic/edit/:id', component: TopicFormComponent, canActivate: [AuthGuard], data: { module: 'topic/manage' } },
    { path: 'topic/:id', component: TopicComponent, canActivate: [AuthGuard], data: { module: 'topic/view' } }
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