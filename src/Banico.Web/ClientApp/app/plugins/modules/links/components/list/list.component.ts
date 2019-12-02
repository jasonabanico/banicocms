import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Link } from '../../entities/link';
import { SectionBarService } from '../../../../../shared/services/section-bar.service';
import { LinksService } from '../../services/links.service';

@Component({
  selector: 'app-plugins-links-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class LinksListComponent implements OnInit {
  private sub: any;
  private path: string;
  public links: Link[];

  constructor(
    private sectionBarService: SectionBarService,
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
      this.sectionBarService.initialize('links', this.path, '', '/links');

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
