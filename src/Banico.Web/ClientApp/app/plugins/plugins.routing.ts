import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const PLUGIN_ROUTES: Routes = [
  {
    path: "contact",
    loadChildren: () =>
      import("./modules/contact/contact.module").then(m => m.ContactModule)
  },
  {
    path: "directory",
    loadChildren: () =>
      import("./modules/directory/directory.module").then(
        m => m.DirectoryModule
      )
  },
  {
    path: "faq",
    loadChildren: () =>
      import("./modules/faq/faq.module").then(m => m.FaqModule)
  },
  {
    path: "forum",
    loadChildren: () =>
      import("./modules/forum/forum.module").then(m => m.ForumModule)
  },
  {
    path: "invite",
    loadChildren: () =>
      import("./modules/invite/invite.module").then(m => m.InviteModule)
  },
  {
    path: "links",
    loadChildren: () =>
      import("./modules/links/links.module").then(m => m.LinksModule)
  },
  {
    path: "list",
    loadChildren: () =>
      import("./modules/list/list.module").then(m => m.ListModule)
  },
  {
    path: "page",
    loadChildren: () =>
      import("./modules/page/page.module").then(m => m.PageModule)
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./modules/profile/profile.module").then(m => m.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(PLUGIN_ROUTES)],
  exports: [RouterModule]
})
export class PluginsRoutingModule {}
