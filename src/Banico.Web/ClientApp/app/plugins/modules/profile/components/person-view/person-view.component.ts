import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PersonProfile } from "../../entities/person-profile";
import { ProfileService } from "../../services/profile.service";
import { AuthService } from "../../../../../shared/services/auth.service";
import { ShellService } from '../../../../../shared/services/shell.service';

@Component({
  selector: "app-plugins-profile-person-view",
  templateUrl: "./person-view.component.html"
})
export class PersonViewComponent implements OnInit {
  public profile: PersonProfile;
  private sub: any;
  public canEdit: boolean;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private shellService: ShellService
  ) {}

  ngOnInit() {
    this.profile = new PersonProfile(null);
    this.sub = this.route.params.subscribe(params => {
      var alias = this.authService.getUserName();
      if (params["alias"]) {
        alias = params["alias"];
      }
      const isAdmin = this.authService.isAdmin();
      const username = this.authService.getUserName();
      this.profileService.getPersonProfile(alias).subscribe(profile => {
        this.profile = profile;
        this.shellService.setTitle(this.profile.alias);
        if (profile.ownerUserIds.includes(username) || isAdmin) {
          this.canEdit = true;
        }
      });
    });
  }
}
