import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subforum } from "../../entities/subforum";
import { ForumSubforumService } from "../../services/subforum.service";
import { AuthService } from "../../../../../shared/services/auth.service";
import { ConfigsService } from "../../../../../shared/services/configs.service";
import { map } from "rxjs/internal/operators/map";
import { SectionBarService } from "../../../../../shared/services/section-bar.service";

@Component({
  selector: "app-plugins-forum-home",
  templateUrl: "./home.component.html"
})
export class ForumHomeComponent implements OnInit, OnDestroy {
  private path: string;
  private sub: any;
  public subforums: Subforum[];
  public canManageSubforum: boolean = false;

  constructor(
    @Inject(SectionBarService) private sectionBarService: SectionBarService,
    private configsService: ConfigsService,
    private subforumService: ForumSubforumService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subforums = new Array();

    this.configsService
      .get("", "forum", "withSections")
      .subscribe(withSections => {
        if (withSections) {
          if (withSections.value === "y") {
            this.initializeForumsByPath();
          } else {
            this.initializeForums();
          }
        } else {
          this.initializeForums();
        }
      });

    this.authService
      .canAccess("forum-subforum/manage", "", false)
      .subscribe(result => (this.canManageSubforum = result));
  }

  private initializeForumsByPath() {
    this.sub = this.route.params.subscribe(params => {
      this.path = params["path"];
      this.sectionBarService.initialize("forum", this.path, "", "/forum");

      if (this.path) {
        this.subforumService
          .getBySectionItems(this.path)
          .subscribe(subforums => this.setSubforums(subforums));
      }
    });
  }

  private initializeForums() {
    this.subforumService
      .getAll()
      .subscribe(subforums => this.setSubforums(subforums));
  }

  private setSubforums(subforums: Subforum[]) {
    this.subforums = subforums.sort((a, b) => b.topicCount - a.topicCount);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
