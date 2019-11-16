import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../../shared/services/auth.service";
import { Profile } from "../../entities/profile";
import { ProfileService } from "../../services/profile.service";

@Component({
  selector: "app-plugins-profile-form",
  templateUrl: "./form.component.html",
  providers: [ProfileService]
})
export class ProfileFormComponent implements OnInit {
  private profile: Profile;
  private sub: any;
  public profileForm: FormGroup = this.fb.group({
    alias: ["", Validators.required],
    headline: ["", Validators.required],
    content: ["", Validators.required]
  });

  public constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      var alias = this.authService.getUserName();
      var type = "in";
      if (params["alias"]) {
        alias = params["alias"];
      }
      if (params["type"]) {
        type = params["type"];
      }
      this.profileService
        .getByTypeAndAlias(type, alias)
        .subscribe(profile => this.setProfile(profile));
    });
  }

  public setProfile(profile: Profile) {
    this.profile = profile;
    this.profileForm.patchValue({
      alias: profile.alias,
      headline: profile.headline,
      content: profile.content
    });
  }

  public save() {
    this.profile.content = this.profileForm.value["content"];
    this.profile.headline = this.profileForm.value["headline"];
    this.profileService.addOrUpdate(this.profile).subscribe(
      result => {
        this.router.navigate([
          "/profile/" + this.profile.type + "/" + this.profile.alias
        ]);
      }
      //errors =>  this.errors = errors
    );
  }
}
