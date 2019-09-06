import { Component, OnInit } from '@angular/core';
import { Topic } from '../../entities/topic';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TopicService } from '../../services/topic.service';
import { SubforumService } from '../../services/subforum.service';
import { PostService } from '../../services/post.service';
import { Subforum } from '../../entities/subforum';
import { Post } from '../../entities/post';

@Component({
  selector: 'app-plugins-forum-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  public subforum: Subforum;
  public topic: Topic;
  public posts: Post[];
  public hasMorePages: boolean;
  public page: number = 0;
  public offset: number = 0;
  
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
    this.postService.setPageSize(20);
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
    this.topicService.setTopicUser(topic);
    this.subforumService.get(topic.subForumId)
      .subscribe(subforum => this.subforum = subforum);
    if (topic.postCount > 0) {      
      this.page = Math.floor(topic.postCount / this.postService.pageSize);
      this.offset = topic.postCount % this.postService.pageSize;
      if ((this.page > 0) && (this.offset === 0))
      {
        this.page -= 1;
      }
      this.postService.getPosts(topic.id, this.page, this.offset)
        .subscribe(posts => this.posts = posts);
    }
  }

  public addPost(post: Post) {
    this.posts.push(post);
  }

  public morePosts() {
    if (this.page > 0) {
      this.page--;
      this.postService.getPosts(this.topic.id, this.page, this.offset)
        .subscribe(posts => {
          this.posts.forEach(function (post) {
            posts.push(post);
          });
          this.posts = posts;
        });
    }
  }
}
