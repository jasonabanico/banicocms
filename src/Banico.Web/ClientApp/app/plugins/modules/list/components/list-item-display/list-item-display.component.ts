import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListItemService } from '../../services/list-item.service';
import { ListService } from '../../services/list.service';
import { ListItem } from '../../entities/list-item';
import { List } from '../../entities/list';

@Component({
  selector: 'app-plugins-list-item-display',
  templateUrl: './list-item-display.component.html',
  styleUrls: ['./list-item-display.component.css']
})
export class ListItemDisplayComponent implements OnInit {
  private sub: any;
  public listItem: ListItem = new ListItem(null);
  public list: List = new List(null);

  constructor(
    private listItemService: ListItemService,
    private listService: ListService,
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

    this.sub = this.route.queryParams
      .subscribe(params => {
        var listId = params.list;
        if (listId) {
          this.setList(listId);
        }
      });
  }

  private set(listItem: ListItem) {
    this.listItem = listItem;
  }

  private setList(listId: string) {
    this.listService.get(listId)
    .subscribe(list => this.list = list);
  }
}
