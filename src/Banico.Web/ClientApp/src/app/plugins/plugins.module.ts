import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentItemService } from './services/content-item.service';

import { ContactModule } from './contact/main/contact.module';
import { DirectoryModule } from './directory/main/directory.module';
import { FaqModule } from './faq/main/faq.module';
import { InviteModule } from './invite/main/invite.module';
import { ListModule } from './list/list.module';
import { PageModule } from './page/main/page.module';
import { ProfileModule } from './profile/main/profile.module';

@NgModule({
    imports: [ 
        CommonModule,
        ContactModule,
        DirectoryModule,
        FaqModule,
        InviteModule,
        ListModule,
        PageModule,
        ProfileModule
    ],
    providers: [ 
        ContentItemService
    ]
})
export class PluginsModule { }