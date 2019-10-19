import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { List } from '../../entities/list';
import { ListService } from '../../services/list.service';
import { ListItemService } from '../../services/list-item.service';
import { ListItem } from '../../entities/list-item';

@Component({
  selector: 'app-plugins-list-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit {
  public list: List;
  public listItems: ListItem[];
  
  constructor(
    private listService: ListService,
    private listItemService: ListItemService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) {
      this.listItems = new Array<ListItem>();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        var id = params['id'];
        this.listService.get(id)
          .subscribe(list => {
           this.set(list);
          });
        }
    });
  }

  private set(list: List) {
    this.list = list;
    this.setListItems(list.listItems);
  }

  private setListItems(listItems: string) {
    const listItemStringArray: string[] = listItems.split(',');
    for (let listItemString of listItemStringArray) {
      this.listItemService.get(listItemString)
      .subscribe(
        listItem => this.listItems.push(listItem)
      );
    }
  }
}
