import { Component, OnInit } from '@angular/core';
import { Topic } from '../../entities/topic';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TopicService } from '../../services/topic.service';
import { SubforumService } from '../../services/subforum.service';
import { Subforum } from '../../entities/subforum';
import { Reply } from '../../entities/reply';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  public topic: Topic;
  public replies: Reply[];
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
