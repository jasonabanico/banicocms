import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const PLUGIN_ROUTES: Routes = [
    {
        path: 'contact',
        loadChildren: './contact/contact.module#ContactModule'
    },
    {
        path: 'directory',
        loadChildren: './directory/main/directory.module#DirectoryModule'
    },
    {
        path: 'faq',
        loadChildren: './faq/main/faq.module#FaqModule'
    },
    {
        path: 'forum',
        loadChildren: './forum/forum.module#ForumModule'
    },
    {
        path: 'invite',
        loadChildren: './invite/main/invite.module#InviteModule'
    },
    {
        path: 'links',
        loadChildren: './links/links.module#ListModule'
    },
    {
        path: 'list',
        loadChildren: './list/list.module#ListModule'
    },
    {
        path: 'page',
        loadChildren: './page/main/page.module#PageModule'
    },
    {
        path: 'profile',
        loadChildren: './profile/main/profile.module#ProfileModule'
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(PLUGIN_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class PluginsRoutingModule {}