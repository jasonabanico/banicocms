import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManageService } from '../../services/manage.service';
import { SetPassword } from './set-password.interface';

@Component({
  selector: 'app-identity-manage-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: []
})
export class IdentityManageSetPasswordComponent {
  isRequesting: boolean;
  isSuccessful: boolean;
  errors: string;  

  constructor(
    private manageService: ManageService,
    private router: Router
  ) { }
  
  public setPassword(value: SetPassword) {
    this.isRequesting = true;
    this.manageService.setPassword(
        value.newPassword,
        value.confirmPassword
    )
    //.finally(() => this.isRequesting = false)
    .subscribe(
      result  => {if (result) {
        this.isSuccessful = true;
      }},
      errors =>  this.errors = errors);

  }
}