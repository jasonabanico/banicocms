import { Component, OnInit } from '@angular/core';
import { Subforum } from '../../entities/subforum';

@Component({
  selector: 'app-subforum-display',
  templateUrl: './subforum-display.component.html',
  styleUrls: ['./subforum-display.component.scss']
})
export class SubforumDisplayComponent implements OnInit {
  public subforum: Subforum;

  constructor() { }

  ngOnInit() {
  }

}
