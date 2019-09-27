import {finalize} from 'rxjs/operators';
import { Component } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-identity-account-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: []
})
export class IdentityAccountForgotPasswordComponent {
  public isSuccessful: boolean;
  public isRequesting: boolean;
  public errors: string;  

  public forgotPasswordForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
  });

  constructor(
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder
  ) { }
  
  public forgotPassword() {
    this.isRequesting = true;
    this.accountService.forgotPassword(
      this.forgotPasswordForm.value['email']
    ).pipe(
    finalize(() => this.isRequesting = false))
    .subscribe(
      result  => {
        this.isSuccessful = true;
      },
      errors =>  this.errors = errors);
  }
}