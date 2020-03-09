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
  public isSectioned: boolean;
  private sub: any;
  public organizationProfileForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
    alias: ["", Validators.required],
    sectionItems: ["", Validators.required],
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
        this.profileService
          .getOrganizationProfile(alias)
          .subscribe(profile => this.setProfile(profile));
      } else {
        this.profile = new OrganizationProfile(null);
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
      name: organizationProfile.name,
      alias: organizationProfile.alias,
      sectionItems: organizationProfile.sectionItems,
      headline: organizationProfile.headline,
      content: organizationProfile.content
    });
  }

  public save() {
    this.profile.name = this.organizationProfileForm.value["name"];
    this.profile.type = "org";
    this.profile.alias = this.organizationProfileForm.value["alias"];
    this.profile.sectionItems = this.organizationProfileForm.value[
      "sectionItem"
    ];
    this.profile.headline = this.organizationProfileForm.value["headline"];
    this.profile.content = this.organizationProfileForm.value["content"];
    this.profileService.addOrUpdateOrganizationProfile(this.profile).subscribe(
      result => {
        this.router.navigate([
          "/profile/" + this.profile.type + "/" + this.profile.alias
        ]);
      }
      //errors =>  this.errors = errors
    );
  }
}
