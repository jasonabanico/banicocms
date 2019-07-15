import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from '../../entities/profile';
import { ProfileService } from '../../services/profile.service';

@Component({
    selector: 'app-profile-display',
    templateUrl: './profile-display.component.html',
    providers: [ProfileService]
})
export class ProfileDisplayComponent implements OnInit, OnDestroy {
    public profile: Profile;
    private sub: any;
    public isAdmin: boolean;

    constructor(
        @Inject(ProfileService) private profileService: ProfileService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.profile = new Profile();
        this.sub = this.route.params.subscribe(params => {
            var alias = params['alias'];
            if (alias) {
                this.profileService.getProfileByAlias(alias)
                .subscribe(profile => this.setProfile(profile));
            } else {
                this.profileService.getProfile()
                .subscribe(profile => this.setProfile(profile));
                this.profileService.getUser()
                .subscribe(profile => this.setUser(profile));
            }
        });

    }

    public setUser(profile: Profile) {
        this.profile.firstName = profile.firstName;
        this.profile.lastName = profile.lastName;
        this.profile.alias = profile.alias;
    }

    public setProfile(profile: Profile) {
        this.profile.updatedDate = profile.updatedDate;
        this.profile.content = profile.content;
        this.profile.htmlContent = profile.htmlContent;
    }

    private SaveResponse(data: any) {
        if (data != null) {
            if (data.value != null) {
                if (data.value == '1') {
                    alert('Saved.');
                    this.router.navigateByUrl('front');
                } else {
                    alert('Save failed.');
                }
            } else {
                alert('Save failed.');
            }
        } else {
            alert('Save failed.');
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
