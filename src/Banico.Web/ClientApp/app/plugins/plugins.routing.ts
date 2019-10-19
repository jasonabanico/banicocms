import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const PLUGIN_ROUTES: Routes = [
  {
    path: "contact",
    loadChildren: "./modules/contact/contact.module#ContactModule"
  },
  {
    path: "directory",
    loadChildren: "./modules/directory/directory.module#DirectoryModule"
  },
  {
    path: "faq",
    loadChildren: "./modules/faq/faq.module#FaqModule"
  },
  {
    path: "forum",
    loadChildren: "./modules/forum/forum.module#ForumModule"
  },
  {
    path: "invite",
    loadChildren: "./modules/invite/invite.module#InviteModule"
  },
  {
    path: "links",
    loadChildren: "./modules/links/links.module#ListModule"
  },
  {
    path: "list",
    loadChildren: "./modules/list/list.module#ListModule"
  },
  {
    path: "page",
    loadChildren: "./modules/page/page.module#PageModule"
  },
  {
    path: "profile",
    loadChildren: "./modules/profile/profile.module#ProfileModule"
  }
];

@NgModule({
  imports: [RouterModule.forChild(PLUGIN_ROUTES)],
  exports: [RouterModule]
})
export class PluginsRoutingModule {}
