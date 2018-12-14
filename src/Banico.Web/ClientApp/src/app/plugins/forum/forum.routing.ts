import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/auth/auth.guard';
import { ForumComponent } from './components/forum.component';
import { SubforumFormComponent } from './components/subforum-form/subforum-form.component';
import { SubforumDisplayComponent } from './components/subforum-display/subforum-display.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { TopicDisplayComponent } from './components/topic-display/topic-display.component';

const FORUM_ROUTES: Routes = [
   { path: 'forum', component: ForumComponent, children: [
     { path: 'subforum/new', component: SubforumFormComponent, canActivate: [AuthGuard], data: { module: 'forum/subforum/manage' } },
     { path: 'subforum/edit/:id', component: SubforumFormComponent, canActivate: [AuthGuard], data: { module: 'forum/subforum/manage' } },
     { path: 'subforum/:alias', component: SubforumDisplayComponent, canActivate: [AuthGuard], data: { module: 'forum/subforum/view' } },
     { path: 'topic/new/:subforumId', component: TopicFormComponent, canActivate: [AuthGuard], data: { module: 'forum/topic/manage' } },
     { path: 'topic/edit/:id', component: TopicFormComponent, canActivate: [AuthGuard], data: { module: 'forum/topic/manage' } },
     { path: 'topic/:id', component: TopicDisplayComponent, canActivate: [AuthGuard], data: { module: 'forum/topic/view' } }
   ] }
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