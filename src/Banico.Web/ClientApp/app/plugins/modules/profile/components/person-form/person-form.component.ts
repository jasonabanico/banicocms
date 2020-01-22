import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../../shared/services/auth.service";
import { PersonProfile } from "../../entities/person-profile";
import { ProfileService } from "../../services/profile.service";

@Component({
  selector: "app-plugins-profile-person-form",
  templateUrl: "./person-form.component.html",
  providers: [ProfileService]
})
export class PersonFormComponent implements OnInit {
  private profile: PersonProfile;
  private sub: any;
  public personProfileForm: FormGroup = this.fb.group({
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
        .getPersonProfile(alias)
        .subscribe(profile => this.setProfile(profile));
    });
  }

  public setProfile(personProfile: PersonProfile) {
    this.profile = personProfile;
    this.personProfileForm.patchValue({
      alias: personProfile.alias,
      headline: personProfile.headline,
      content: personProfile.content
    });
  }

  public save() {
    this.profile.content = this.personProfileForm.value["content"];
    this.profile.headline = this.personProfileForm.value["headline"];
    this.profileService.addOrUpdatePersonProfile(this.profile).subscribe(
      result => {
        this.router.navigate([
          "/profile/" + this.profile.type + "/" + this.profile.alias
        ]);
      }
      //errors =>  this.errors = errors
    );
  }
}
