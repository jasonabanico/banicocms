import { Component, OnInit } from '@angular/core';
import { ListItem } from '../../main/listitem';

@Component({
  selector: 'listitemform',
  templateUrl: './listitemform.component.html',
  styleUrls: ['./listitemform.component.css']
})
export class ListItemFormComponent implements OnInit {
  public listItem: ListItem;

  constructor() { }

  ngOnInit() {
  }

}
