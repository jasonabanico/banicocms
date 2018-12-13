import { Component, OnInit } from '@angular/core';
import { Topic } from '../../entities/topic';

@Component({
  selector: 'app-topic-display',
  templateUrl: './topic-display.component.html',
  styleUrls: ['./topic-display.component.scss']
})
export class TopicDisplayComponent implements OnInit {
  public topic: Topic;
  
  constructor() { }

  ngOnInit() {
  }

}
