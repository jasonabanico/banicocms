import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Link } from '../../entities/link';
import { NavBarService } from '../../../../shell/nav-bar/nav-bar.service';
import { LinksService } from '../../services/links.service';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {
  private sub: any;
  private path: string;
  public links: Link[];

  constructor(
    private navBarService: NavBarService,
    public linksService: LinksService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) {
      this.links = new Array<Link>();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.path = params['path'];
      this.navBarService.initialize('links', this.path, '', '/links');

      if (this.path) {
          this.linksService.getLinks(this.path)
          .subscribe(links => this.setLinks(links));
      }
    });
  }

  private setLinks(links: Link[]) {
    this.links = links;
}
}
