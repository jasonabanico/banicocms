import { finalize } from "rxjs/operators";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AccountService } from "../../services/account.service";

@Component({
  selector: "app-identity-account-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: []
})
export class IdentityAccountResetPasswordComponent {
  private sub: any;
  public isRequesting: boolean;
  public isSuccessful: boolean = false;
  public errors: string;

  public resetPasswordForm: FormGroup = this.fb.group({
    email: ["", Validators.required],
    code: ["", Validators.required],
    password: ["", Validators.required],
    confirmPassword: ["", Validators.required]
  });

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      var email = params.email;
      var code = params.code;
      if (email) {
        this.resetPasswordForm.controls["email"].setValue(email);
        this.resetPasswordForm.controls["code"].setValue(code);
      }
    });
  }

  public resetPassword() {
    this.isRequesting = true;
    this.accountService
      .resetPassword(
        this.resetPasswordForm.value["email"],
        this.resetPasswordForm.value["code"],
        this.resetPasswordForm.value["password"],
        this.resetPasswordForm.value["confirmPassword"]
      )
      .pipe(finalize(() => (this.isRequesting = false)))
      .subscribe(
        result => {
          if (result) {
            this.isSuccessful = true;
          }
        },
        errors => (this.errors = errors)
      );
  }
}
