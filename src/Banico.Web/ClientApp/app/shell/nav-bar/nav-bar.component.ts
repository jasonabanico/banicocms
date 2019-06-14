import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NavBarService } from './nav-bar.service';
import { SectionsService } from '../../shared/services/sections.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {
    public href: string = "";

      constructor(
        @Inject(NavBarService) public navBarService: NavBarService,
        private location: Location,
        private router: Router
    ) {
        router.events.subscribe((val) => {
            if(location.path() != ''){
              this.href = location.path();
            }
        });
      }

    ngOnInit() {
    }
}
