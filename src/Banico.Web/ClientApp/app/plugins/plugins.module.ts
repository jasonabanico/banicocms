import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ContentItemService } from "./services/content-item.service";
import { PluginsRoutingModule } from "./plugins.routing";
import { ContactModule } from "./modules/contact/contact.module";
import { DirectoryModule } from "./modules/directory/directory.module";
import { FaqModule } from "./modules/faq/faq.module";
import { ForumModule } from "./modules/forum/forum.module";
import { InviteModule } from "./modules/invite/invite.module";
import { LinksModule } from "./modules/links/links.module";
import { ListModule } from "./modules/list/list.module";
import { PageModule } from "./modules/page/page.module";
import { ProfileModule } from "./modules/profile/profile.module";
import { VideosModule } from "./modules/videos/videos.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PluginsRoutingModule,
    ContactModule,
    DirectoryModule,
    FaqModule,
    ForumModule,
    InviteModule,
    LinksModule,
    ListModule,
    PageModule,
    ProfileModule,
    VideosModule
  ],
  providers: [ContentItemService]
})
export class PluginsModule {}
