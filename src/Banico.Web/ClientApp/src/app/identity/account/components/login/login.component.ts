import { Component, Inject } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as toastr from 'toastr';
import { AccountService } from '../../main/account.service';
import { WindowRefService } from '../../../../shared/services/windowref.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  isRequesting: boolean = false;
  isSuccessful: boolean = false;
  errors: string[] = new Array<string>();  
  returnUrl: string = '/';

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    @Inject(WindowRefService) private windowRefService: WindowRefService,
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    toastr.options = {
      preventDuplicates: true,
      timeOut: 0,
      extendedTimeOut: 0,
      closeButton: true
    };    

    this.route.queryParams
      .subscribe(params => {
        if (params.returnUrl) {
          this.returnUrl = params.returnUrl;
        }
      });
  }
  
  public login() {
    this.isRequesting = true;
    this.accountService.login(
      this.loginForm.value['email'],
      this.loginForm.value['password']
    )
    .finally(() => this.isRequesting = false)
    .subscribe(
      result  => {
        if (result) {
          var myResult: any = result;
          this.authService.setAuthToken(myResult.auth_token);
          this.setUserId();
          this.setIsAdmin();
          this.isSuccessful = true;
          this.router.navigate([this.returnUrl]);
          this.windowRefService.nativeWindow.location.reload();                       
        } else {
        }
      },
      errors => {
        errors[''].forEach(error => toastr.error(error));
      });
  }

  public setIsAdmin() {
    this.accountService.isSuperAdmin()
    .subscribe(
      result => {
        this.authService.setIsAdmin(result);
      }
    )    
  }

  public setUserId() {
    this.accountService.loggedInAs()
    .subscribe(
      result => {
        this.authService.setLogin(result);
      }
    );
  }
}