import { Component, OnInit } from '@angular/core';
import { List } from '../../entities/list';

@Component({
  selector: 'list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit {
  public list: List;
  
  constructor() { }

  ngOnInit() {
  }

}
