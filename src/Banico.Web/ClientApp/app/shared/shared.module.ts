import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ConfigService } from "./utils/config.service";
import { WindowRefService } from "./services/windowref.service";
import { SectionsService } from "./services/sections.service";
import { SectionBarService } from "./services/section-bar.service";

@NgModule({
  imports: [CommonModule],
  providers: [
    ConfigService,
    SectionsService,
    SectionBarService,
    WindowRefService
    // , {
    //   provide: HttpXhrBackend,
    //   useClass: AuthenticateXHRBackend
    // }
  ]
})
export class SharedModule {}
