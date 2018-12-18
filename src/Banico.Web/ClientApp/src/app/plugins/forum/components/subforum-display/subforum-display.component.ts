import { Component, OnInit } from '@angular/core';
import { Subforum } from '../../entities/subforum';
import { SubforumService } from '../../services/subforum.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subforum-display',
  templateUrl: './subforum-display.component.html',
  styleUrls: ['./subforum-display.component.scss']
})
export class SubforumDisplayComponent implements OnInit {
  public subforum: Subforum;

  constructor(
    private subforumService: SubforumService,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['alias']) {
        var alias = params['alias'];
        this.subforumService.getByAlias(alias)
          .subscribe(subforum => {
           this.subforum = subforum;
          });
        }
    });
  }

}
