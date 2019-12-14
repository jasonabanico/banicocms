import { Component, OnInit, ViewChild } from "@angular/core";
import { Topic } from "../../entities/topic";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { ForumTopicService } from "../../services/topic.service";
import { ForumSubforumService } from "../../services/subforum.service";
import { ForumPostService } from "../../services/post.service";
import { Subforum } from "../../entities/subforum";
import { Post } from "../../entities/post";
import { AuthService } from "../../../../../shared/services/auth.service";

@Component({
  selector: "app-plugins-forum-topic",
  templateUrl: "./topic.component.html",
  styleUrls: ["./topic.component.scss"]
})
export class ForumTopicComponent implements OnInit {
  public userId: string;
  public isAdmin: boolean;
  public subforum: Subforum;
  public topic: Topic;
  public posts: Post[];
  public hasMorePages: boolean;
  public page: number = 0;
  public offset: number = 0;

  constructor(
    private topicService: ForumTopicService,
    private subforumService: ForumSubforumService,
    private postService: ForumPostService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.userId = authService.getUserId();
    this.isAdmin = authService.isAdmin();
  }

  @ViewChild("deleteModal", { static: false }) deleteModal;

  public ngOnInit() {
    this.postService.setPageSize(20);
    this.route.params.subscribe(params => {
      var id = params["id"];
      if (id) {
        this.topicService.get(id).subscribe(topic => {
          this.set(topic);
        });
      }
    });
  }

  private set(topic: Topic) {
    this.topic = topic;
    this.topicService.setTopicUser(topic);
    this.subforumService
      .get(topic.subforumId)
      .subscribe(subforum => (this.subforum = subforum));
    if (topic.postCount > 0) {
      this.page = Math.floor(topic.postCount / this.postService.pageSize);
      this.offset = topic.postCount % this.postService.pageSize;
      if (this.page > 0 && this.offset === 0) {
        this.page -= 1;
      }
      this.postService
        .getPosts(topic.id, this.page, this.offset)
        .subscribe(posts => (this.posts = posts));
    }
  }

  public addPost(post: Post) {
    const newPost = post.clone();
    this.posts.push(newPost);
    this.topic.postCount += 1;
  }

  public morePosts() {
    if (this.page > 0) {
      this.page--;
      this.postService
        .getPosts(this.topic.id, this.page, this.offset)
        .subscribe(posts => {
          this.posts.forEach(function(post) {
            posts.push(post);
          });
          if (posts) {
            this.posts = posts.sort(
              (a, b) => a.createdDateTicks - b.createdDateTicks
            );
          }
        });
    }
  }

  public removePost(id: string) {
    this.posts = this.posts.filter(post => post.id !== id);
    this.topic.postCount -= 1;
  }

  delete() {
    this.deleteModal.show();
  }

  public deleteConfirmed() {
    this.topicService.delete(this.topic.id).subscribe(id => {
      if (id === this.topic.id)
        this.router.navigateByUrl("/forum/" + this.subforum.alias);
    });
  }
}
