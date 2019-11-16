import { Component } from "@angular/core";
import { Subforum } from "../../entities/subforum";
import { ForumSubforumService } from "../../services/subforum.service";
import { AuthService } from "../../../../../shared/services/auth.service";
import { map } from "rxjs/internal/operators/map";

@Component({
  selector: "app-plugins-forum-home",
  templateUrl: "./home.component.html"
})
export class ForumHomeComponent {
  public subforums: Subforum[];
  public canManageSubforum: boolean = false;

  constructor(
    private subforumService: ForumSubforumService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subforums = new Array();
    this.subforumService
      .getAll()
      .subscribe(subforums => this.setSubforums(subforums));
    this.authService
      .canAccess("forum-subforum/manage", "", false)
      .subscribe(result => (this.canManageSubforum = result));
  }

  private setSubforums(subforums: Subforum[]) {
    this.subforums = subforums.sort((a, b) => b.topicCount - a.topicCount);
  }
}
