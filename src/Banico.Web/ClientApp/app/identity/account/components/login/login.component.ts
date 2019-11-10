import { first } from "rxjs/operators";
import { Component, Inject } from "@angular/core";
import { NgForm, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import * as toastr from "toastr";
import { AccountService } from "../../services/account.service";
import { WindowRefService } from "../../../../shared/services/windowref.service";
import { AuthService } from "../../../../shared/services/auth.service";
import { ContentItemService } from "../../../../plugins/services/content-item.service";
import { ToastrService } from "../../../../shared/services/toastr.service";
import { Observable } from "rxjs/internal/Observable";
import { combineLatest } from "rxjs";

@Component({
  selector: "app-identity-account-login",
  templateUrl: "./login.component.html",
  styleUrls: []
})
export class IdentityAccountLoginComponent {
  public isRequesting = false;
  public isSuccessful = false;
  public errors: string[] = new Array<string>();
  public returnUrl = "/";

  public loginForm: FormGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  constructor(
    @Inject(WindowRefService) private windowRefService: WindowRefService,
    private contentItemService: ContentItemService,
    private authService: AuthService,
    private accountService: AccountService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    toastr.options = {
      preventDuplicates: true,
      timeOut: 0,
      extendedTimeOut: 0,
      closeButton: true
    };

    this.route.queryParams.subscribe(params => {
      if (params.returnUrl) {
        this.returnUrl = params.returnUrl;
      }
    });
  }

  public async login() {
    this.isRequesting = true;
    try {
      const result = await this.accountService
        .login(
          this.loginForm.value["username"],
          this.loginForm.value["password"]
        )
        .pipe(first())
        .toPromise();
      if (result) {
        const myResult: any = result;
        this.authService.setToken(myResult.auth_token);
        this.authService.setUserId(myResult.id);
        this.authService.setUserName(myResult.username);
        this.authService.setTenant(myResult.tenant);
        this.authService.setAvatarHash(myResult.avatar_hash);
        this.authService.setIsSuperAdmin(myResult.is_superadmin);
        this.authService.setIsAdmin(myResult.is_admin);
        //this.getProfile(myResult.id);
        this.authService.loginDataChanged.emit();
        this.router.navigate([this.returnUrl]);
      }
    } catch (errors) {
      this.toastrService.showErrors(errors);
    }
    this.isRequesting = false;
  }

  // private getProfile(id: string) {
  //   this.contentItemService.getProfileById(id)
  //   .subscribe(user => {
  //     this.authService.setUserName(user.alias);
  //     this.authService.setAvatarHash(user.attribute01);
  //   });
  // }
}
