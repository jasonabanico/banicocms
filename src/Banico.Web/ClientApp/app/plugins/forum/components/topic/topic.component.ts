import { Component, OnInit } from '@angular/core';
import { Topic } from '../../entities/topic';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TopicService } from '../../services/topic.service';
import { SubforumService } from '../../services/subforum.service';
import { PostService } from '../../services/post.service';
import { Subforum } from '../../entities/subforum';
import { Post } from '../../entities/post';
import * as moment from 'moment';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  public topic: Topic;
  public posts: Post[];
  public subforum: Subforum;
  public moment: string;
  public momentRelative: string;
  
  constructor(
    private topicService: TopicService,
    private subforumService: SubforumService,
    private postService: PostService,
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
    this.moment = moment(topic.createdDate).format('MMMM Do YYYY, h:mm:ss a');
    this.momentRelative = moment(topic.createdDate).fromNow();
    this.topicService.setTopicUser(topic);
    this.subforumService.get(topic.subForumId)
      .subscribe(subforum => this.subforum = subforum);
    this.postService.getPosts(topic.id, 0, 0)
      .subscribe(posts => this.posts = posts);
  }
}
