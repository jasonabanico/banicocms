import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subforum } from "../../entities/subforum";
import { ForumTopicService } from "../../services/topic.service";
import { ForumSubforumService } from "../../services/subforum.service";
import { Topic } from "../../entities/topic";

@Component({
  selector: "app-plugins-forum-topic-form",
  templateUrl: "./topic-form.component.html",
  styleUrls: ["./topic-form.component.scss"]
})
export class ForumTopicFormComponent implements OnInit {
  public subforum: Subforum;
  public cancelLink: string;

  public topicForm: FormGroup = this.fb.group({
    id: ["", Validators.required],
    subforumId: ["", Validators.required],
    title: ["", Validators.required],
    text: ["", Validators.required]
  });

  constructor(
    private topicService: ForumTopicService,
    private subforumService: ForumSubforumService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.route.params.subscribe(params => {
      var subforumId = params["subforumId"];
      if (subforumId) {
        this.subforumService.get(subforumId).subscribe(subforum => {
          this.setSubforum(subforum);
        });
      }
    });

    this.route.params.subscribe(params => {
      var id = params["id"];
      if (id) {
        this.topicService.get(id).subscribe(topic => {
          this.set(topic);
        });
      }
    });
  }

  public setSubforum(subforum: Subforum) {
    this.subforum = subforum;
    this.cancelLink =
      "/forum/sub/" + subforum.alias + "/" + subforum.sectionItems;
    this.topicForm.patchValue({
      subforumId: subforum.id
    });
  }

  private set(topic: Topic) {
    this.topicForm.patchValue({
      id: topic.id,
      subforumId: topic.subforumId,
      title: topic.title,
      text: topic.text
    });
    this.cancelLink = "/forum/topic/" + topic.id;
    this.subforumService.get(topic.subforumId).subscribe(subforum => {
      this.setSubforum(subforum);
    });
  }

  public save() {
    // this.isRequesting = true;
    var id = this.topicForm.value["id"];
    this.topicService
      .addOrUpdate(
        id,
        this.topicForm.value["subforumId"],
        this.topicForm.value["title"],
        this.topicForm.value["text"]
      )
      .subscribe(
        id => {
          this.router.navigate(["/forum/topic/" + id]);
        }
        //errors =>  this.errors = errors
      );
  }
}
