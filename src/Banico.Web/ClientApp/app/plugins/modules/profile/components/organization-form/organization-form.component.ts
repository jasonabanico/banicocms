import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../../shared/services/auth.service";
import { OrganizationProfile } from "../../entities/organization-profile";
import { ProfileService } from "../../services/profile.service";

@Component({
  selector: "app-plugins-profile-organization-form",
  templateUrl: "./organization-form.component.html",
  providers: [ProfileService]
})
export class OrganizationFormComponent implements OnInit {
  private profile: OrganizationProfile;
  private isSectioned: boolean;
  private sub: any;
  public organizationProfileForm: FormGroup = this.fb.group({
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
      if (params["type"]) {
        type = params["type"];
      }
      if (params["alias"]) {
        alias = params["alias"];
        this.profileService.getPersonProfile(alias);
        //.subscribe(profile => this.setProfile(profile));
      } else {
        var contentSectionItems = params["path"];
        if (contentSectionItems) {
          this.isSectioned = true;
          this.setSection(contentSectionItems);
        }
      }
    });
  }

  private setSection(contentSectionItems: string) {
    this.organizationProfileForm.patchValue({
      sectionItems: contentSectionItems
    });
    //this.cancelLink = "/forum/" + contentSectionItems;
  }

  public setProfile(organizationProfile: OrganizationProfile) {
    this.profile = organizationProfile;
    this.organizationProfileForm.patchValue({
      alias: organizationProfile.alias,
      headline: organizationProfile.headline,
      content: organizationProfile.content
    });
  }

  public save() {
    this.profile.content = this.organizationProfileForm.value["content"];
    this.profile.headline = this.organizationProfileForm.value["headline"];
    // this.profileService.addOrUpdate(this.organizationProfile).subscribe(
    //   result => {
    //     this.router.navigate([
    //       "/profile/" +
    //         this.organizationProfile.type +
    //         "/" +
    //         this.organizationProfile.alias
    //     ]);
    //   }
    //   //errors =>  this.errors = errors
    // );
  }
}
