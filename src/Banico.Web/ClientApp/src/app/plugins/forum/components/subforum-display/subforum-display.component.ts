import { Component, OnInit } from '@angular/core';
import { Subforum } from '../../entities/subforum';
import { SubforumService } from '../../services/subforum.service';
import { TopicService } from '../../services/topic.service';
import { ActivatedRoute } from '@angular/router';
import { Topic } from '../../entities/topic';

@Component({
  selector: 'app-subforum-display',
  templateUrl: './subforum-display.component.html',
  styleUrls: ['./subforum-display.component.scss']
})
export class SubforumDisplayComponent implements OnInit {
  public subforum: Subforum;
  public topics: Topic[];

  constructor(
    private subforumService: SubforumService,
    private topicService: TopicService,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['alias']) {
        var alias = params['alias'];
        this.subforumService.getByAlias(alias)
          .subscribe(subforum => {
            this.set(subforum);
          });
        }
    });
  }

  private set(subforum: Subforum) {
    this.subforum = subforum;
    this.topicService.getTopics(subforum.id)
      .subscribe(topics => this.topics = topics);
  }

}
