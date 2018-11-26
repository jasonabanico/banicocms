import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListItemService } from '../../services/list-item.service';
import { ListItem } from '../../entities/list-item';

@Component({
  selector: 'list-item-display',
  templateUrl: './list-item-display.component.html',
  styleUrls: ['./list-item-display.component.css']
})
export class ListItemDisplayComponent implements OnInit {
  private sub: any;
  public listItem: ListItem = new ListItem(null);

  constructor(
    private listItemService: ListItemService,
    private router: Router,
    private route: ActivatedRoute
    ) {
}

  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['alias']) {
        var alias = params['alias'];
        this.listItemService.getByAlias(alias)
          .subscribe(listSet => {            
            this.set(listSet);
          });
        }
    });
  }

  private set(listItem: ListItem) {
    this.listItem = listItem;
  }

}
