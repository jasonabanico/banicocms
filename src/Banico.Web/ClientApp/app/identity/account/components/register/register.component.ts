import {finalize} from 'rxjs/operators';
import { Component } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { ToastrService } from '../../../../shared/services/toastr.service';

@Component({
  selector: 'app-identity-account-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class IdentityAccountRegisterComponent {
    public isRequesting = false;
    public isSuccessful = false;
    public errors: string[][] = [,];
    public submitted = false;
    public inviteOnly = true;

    public registerForm: FormGroup = this.fb.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        code: ['', Validators.required]
    });

    constructor (
        private accountService: AccountService,
        private toastrService: ToastrService,
        private router: Router,
        private fb: FormBuilder
    ) {
        let isInviteOnly = this.accountService.isInviteOnly().subscribe(result => {
            this.inviteOnly = (result === "true");
        });
    }

    public cleanStringify(object) {
        if (object && typeof object === 'object') {
            object = copyWithoutCircularReferences([object], object);
        }
        return JSON.stringify(object);

        function copyWithoutCircularReferences(references, object) {
            var cleanObject = {};
            Object.keys(object).forEach(function(key) {
                var value = object[key];
                if (value && typeof value === 'object') {
                    if (references.indexOf(value) < 0) {
                        references.push(value);
                        cleanObject[key] = copyWithoutCircularReferences(references, value);
                        references.pop();
                    } else {
                        cleanObject[key] = '###_Circular_###';
                    }
                } else if (typeof value !== 'function') {
                    cleanObject[key] = value;
                }
            });
            return cleanObject;
        }
    }

    public register() {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = [,];
        //if (valid) {
            this.isRequesting = true;
            this.accountService.register(
                this.registerForm.value['username'],
                this.registerForm.value['email'],
                this.registerForm.value['password'],
                this.registerForm.value['confirmPassword'],
                this.registerForm.value['code']
            ).pipe(
            finalize(() => {
                this.isRequesting = false;
            }))
            .subscribe(
                result  => {
                    this.isRequesting = false;
                    this.isSuccessful = true;
                },
                err => {
                    this.toastrService.showErrors(err);
                });
                    // this.router.navigate(['/login'], {
                    //     queryParams: {
                    //         brandNew: true,
                    //         email:value.email
                    //     }
                    // }); 
    }
}
