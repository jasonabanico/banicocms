import { Component, OnInit, ViewChild } from "@angular/core";
import { Subforum } from "../../entities/subforum";
import { ForumSubforumService } from "../../services/subforum.service";
import { ForumTopicService } from "../../services/topic.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Topic } from "../../entities/topic";
import { SubforumEntityService } from "../../services/subforum-entity.service";
import { AuthService } from "../../../../../shared/services/auth.service";

@Component({
  selector: "app-plugins-forum-subforum",
  templateUrl: "./subforum.component.html",
  styleUrls: ["./subforum.component.scss"]
})
export class ForumSubforumComponent implements OnInit {
  //public subforum$: Observable<Subforum>;
  public userId: string;
  public isAdmin: boolean;
  public subforum: Subforum;
  public topics: Topic[];
  public hasMorePages: boolean;
  public page: number = 0;
  public totalPages: number = 0;
  public offset: number = 0;

  constructor(
    //private subforumEntityService: SubforumEntityService,
    private subforumService: ForumSubforumService,
    private topicService: ForumTopicService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.userId = authService.getUserId();
    this.isAdmin = authService.isAdmin();
  }

  @ViewChild("deleteModal", {static: false}) deleteModal;

  ngOnInit() {
    this.topicService.setPageSize(15);
    this.route.params.subscribe(params => {
      var alias = params["alias"];
      var sectionItems = params["path"];
      this.subforumService
        .getByAliasAndSection(alias, sectionItems)
        .subscribe(subforum => {
          this.set(subforum);
        });
    });
  }

  private set(subforum: Subforum) {
    this.subforum = subforum;
    if (subforum.topicCount > 0) {
      this.topicService
        .getTopics(subforum.id, this.page, this.offset)
        .subscribe(topics => (this.topics = topics));
    }
    this.totalPages = Math.floor(
      this.subforum.topicCount / this.topicService.pageSize
    );
  }

  public edit() {
    this.router.navigate(["/forum/sub/edit/" + this.subforum.id]);
  }

  public moreTopics() {
    if (this.page < this.totalPages) {
      this.page++;
      this.topicService
        .getTopics(this.subforum.id, this.page, this.offset)
        .subscribe(topics => {
          this.topics.forEach(function(topic) {
            topics.push(topic);
          });
          this.topics = topics.sort((a, b) => b.postCount - a.postCount);
        });
    }
  }

  delete() {
    this.deleteModal.show();
  }

  public deleteConfirmed() {
    this.subforumService.delete(this.subforum.id).subscribe(id => {
      if (id === this.subforum.id) this.router.navigateByUrl("/forum");
    });
  }
}
