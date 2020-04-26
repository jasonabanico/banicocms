import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SectionBarService } from "../../../../../shared/services/section-bar.service";
import { ProfileService } from "../../services/profile.service";
import { AuthService } from "../../../../../shared/services/auth.service";
import { OrganizationProfile } from "../../entities/organization-profile";

@Component({
  selector: "app-plugins-profile-organization-view",
  templateUrl: "./organization-view.component.html"
})
export class OrganizationViewComponent implements OnInit {
  public profile: OrganizationProfile;
  private sub: any;
  public canEdit: boolean;

  constructor(
    private sectionBarService: SectionBarService,
    private profileService: ProfileService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.profile = new OrganizationProfile(null);
    this.sub = this.route.params.subscribe(params => {
      var alias = this.authService.getUserName();
      var type = "in";
      if (params["alias"]) {
        alias = params["alias"];
      }
      const isAdmin = this.authService.isAdmin();
      const userId = this.authService.getUserId();
      this.profileService.getOrganizationProfile(alias).subscribe(profile => {
        this.profile = profile;
        if (profile.createdBy === userId || isAdmin) {
          this.canEdit = true;
        }
        this.sectionBarService.initialize(
          "profile",
          profile.sectionItems,
          "",
          "/profile",
          true
        );
      });
    });
  }
}
