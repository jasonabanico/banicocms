import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded: boolean = false;
  isLoggedIn: boolean = false;
  loggedInAs: string = '';

  constructor(
    @Inject(AuthService) private authService: AuthService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.authService.isLoggedIn()
      .subscribe(result => this.isLoggedIn = result);
    this.authService.loggedInAs()
      .subscribe(data => this.loggedInAs = data);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
