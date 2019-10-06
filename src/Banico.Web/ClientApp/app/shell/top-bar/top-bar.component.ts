import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { WindowRefService } from '../../shared/services/windowref.service';
import { AuthService } from '../../shared/services/auth.service';
import { AccountService } from '../../identity/account/services/account.service';

@Component({
  selector: 'app-shell-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isExpanded: boolean = false;
  isLoggedIn: boolean = false;
  loggedInAs: string = '';
  avatarHash: string = '';

  constructor(
    @Inject(WindowRefService) private windowRefService: WindowRefService,
    @Inject(AccountService) private accountService: AccountService,
    @Inject(AuthService) private authService: AuthService,
    private location: Location
  ) {
    this.authService.loginDataChanged.subscribe(
      result => {
        this.updateLogin();
      }
    )
  }

  ngOnInit() {
    this.updateLogin();
  }

  updateLogin() {
    this.isLoggedIn = this.authService.hasToken();
    this.loggedInAs = this.authService.getUserName();
    this.avatarHash = this.authService.getAvatarHash();
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
