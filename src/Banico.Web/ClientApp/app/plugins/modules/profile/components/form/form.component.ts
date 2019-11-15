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
  public profileForm: FormGroup = this.fb.group({
    id: ["", Validators.required],
    alias: ["", Validators.required],
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
    var alias = this.authService.getUserName();
    this.profileService
      .getByAlias(alias)
      .subscribe(profile => this.setProfile(profile));
  }

  public setProfile(profile: Profile) {
    this.profileForm.patchValue({
      id: profile.id,
      alias: profile.alias,
      content: profile.content
    });
  }

  public save() {
    var id = this.profileForm.value["id"];
    var alias = this.profileForm.value["alias"];
    var content = this.profileForm.value["content"];
    this.profileService.addOrUpdate(id, alias, content).subscribe(
      result => {
        this.router.navigate(["/profile/" + alias]);
      }
      //errors =>  this.errors = errors
    );
  }
}
