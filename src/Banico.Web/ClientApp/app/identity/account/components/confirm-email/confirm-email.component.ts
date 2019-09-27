import {finalize, filter} from 'rxjs/operators';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-identity-account-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: []
})
export class IdentityAccountConfirmEmailComponent {
  private sub: any;
  isRequesting: boolean;
  isSuccessful: boolean = false;
  errors: string;  

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.queryParams.pipe(
      filter(params => params.userId))
      .subscribe(params => {
        var userId = params.userId;
        var code = params.code;
        if ((userId) && (code)) {
          this.confirmEmail(userId, code);
        }
      });
  }
  
  public confirmEmail(
    userId: string,
    code: string) {
    this.isRequesting = true;
    this.accountService.confirmEmail(
      userId,
      code
    ).pipe(
    finalize(() => this.isRequesting = false))
    .subscribe(
      result  => {
        if (result){
          this.isSuccessful = true;                         
        }
      },
      errors =>  {
        this.errors = errors;
      });
  }
}