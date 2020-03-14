import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrganizationProfile } from "../../entities/organization-profile";
import { ProfileService } from "../../services/profile.service";
import { AuthService } from "../../../../../shared/services/auth.service";
import { ConfigsService } from "../../../../../shared/services/configs.service";
import { map } from "rxjs/internal/operators/map";
import { SectionBarService } from "../../../../../shared/services/section-bar.service";
import { ShellService } from "../../../../../shared/services/shell.service";

@Component({
  selector: "app-plugins-profile-home",
  templateUrl: "./home.component.html"
})
export class ProfileHomeComponent implements OnInit, OnDestroy {
  private path: string;
  private sub: any;
  public profiles: OrganizationProfile[];
  public canManageProfile: boolean = false;

  constructor(
    @Inject(SectionBarService) private sectionBarService: SectionBarService,
    private configsService: ConfigsService,
    private shellService: ShellService,
    private profileService: ProfileService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.profiles = new Array();

    this.initializeProfiles();

    this.authService
      .canAccess("profile-org/manage", "", false)
      .subscribe(result => {
        this.canManageProfile = result;
      });

    this.shellService.setTitle("Profiles");
  }

  private initializeProfiles() {
    this.sub = this.route.params.subscribe(params => {
      this.path = params["path"];
      this.sectionBarService.initialize(
        "profile",
        this.path,
        "",
        "/profile",
        true
      );

      if (this.path) {
        this.profileService
          .getOrganizationProfilesBySectionItems(this.path)
          .subscribe(profiles => this.setProfiles(profiles));
      }
    });
  }

  private setProfiles(profiles: OrganizationProfile[]) {
    this.profiles = profiles;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
