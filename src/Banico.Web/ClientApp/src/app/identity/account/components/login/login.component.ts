import { Component, Inject } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as toastr from 'toastr';
import { AccountService } from '../../main/account.service';
import { WindowRefService } from '../../../../shared/services/windowref.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { combineLatest } from 'rxjs';

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
          this.authService.setToken(myResult.auth_token);
          var result1 = this.setUserId();
          var result2 = this.setIsAdmin();
          this.isSuccessful = true;
          combineLatest(result1, result2)
          .subscribe(
            result => {
              this.router.navigate([this.returnUrl]);
              this.windowRefService.nativeWindow.location.reload();                       
            }
          );
        }
      },
      errors => {
        errors[''].forEach(error => toastr.error(error));
      });
  }

  public setIsAdmin(): Observable<boolean> {
    var result = this.accountService.isSuperAdmin();
    result.subscribe(
      result => {
        this.authService.setIsAdmin(result);
      }
    );
    return result.map(result => true);
  }

  public setUserId(): Observable<boolean> {
    var result = this.accountService.loggedInAs();
    result.subscribe(
      result => {
        this.authService.setUserId(result);
      }
    );
    return result.map(result => true);
  }
}