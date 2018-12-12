import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { WindowRefService } from '../../shared/services/windowref.service';
import { AuthService } from '../../shared/services/auth.service';
import { AccountService } from '../../identity/account/main/account.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded: boolean = false;
  isLoggedIn: boolean = false;
  loggedInAs: string = '';

  constructor(
    @Inject(WindowRefService) private windowRefService: WindowRefService,
    @Inject(AccountService) private accountService: AccountService,
    @Inject(AuthService) private authService: AuthService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.hasToken();
    this.loggedInAs = this.authService.getUserName();
  }

  logout() {
    this.accountService.logout()
    .subscribe(data => {
      this.authService.removeToken();
      this.windowRefService.nativeWindow.location.reload();
    },
    error => {
      this.authService.removeToken();
      this.windowRefService.nativeWindow.location.reload();
    });
}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
