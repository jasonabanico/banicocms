import { Component, OnInit } from '@angular/core';
import { Topic } from '../../entities/topic';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TopicService } from '../../services/topic.service';
import { SubforumService } from '../../services/subforum.service';
import { Subforum } from '../../entities/subforum';

@Component({
  selector: 'app-topic-display',
  templateUrl: './topic-display.component.html',
  styleUrls: ['./topic-display.component.scss']
})
export class TopicDisplayComponent implements OnInit {
  public topic: Topic;
  public subforum: Subforum;
  
  constructor(
    private topicService: TopicService,
    private subforumService: SubforumService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) {
  }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id'];
      if (id) {
        this.topicService.get(id)
        .subscribe(topic => {
          this.set(topic);
        });
      }
    });
  }

  private set(topic: Topic) {
    this.topic = topic;

    this.subforumService.get(topic.subForumId)
    .subscribe(subforum => this.subforum = subforum);
  }
}
