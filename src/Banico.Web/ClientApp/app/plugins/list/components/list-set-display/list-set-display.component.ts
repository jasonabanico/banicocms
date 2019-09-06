import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListSet } from '../../entities/list-set';
import { ListSetService } from '../../services/list-set.service';

@Component({
  selector: 'app-plugins-list-set-display',
  templateUrl: './list-set-display.component.html',
  styleUrls: ['./list-set-display.component.scss']
})
export class ListSetDisplayComponent implements OnInit {
  private sub: any;
  public listSet: ListSet = new ListSet(null);

  constructor(
    private listSetService: ListSetService,
    private router: Router,
    private route: ActivatedRoute
    ) {
}

  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['alias']) {
        var alias = params['alias'];
        this.listSetService.getByAlias(alias)
          .subscribe(listSet => {            
            this.set(listSet);
          });
        }
    });
  }

  private set(listSet: ListSet) {
    this.listSet = listSet;
  }

}
