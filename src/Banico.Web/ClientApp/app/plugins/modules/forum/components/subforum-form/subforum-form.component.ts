import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subforum } from "../../entities/subforum";
import { SubforumEntityService } from "../../services/subforum-entity.service";
import { ForumSubforumService } from "../../services/subforum.service";

@Component({
  selector: "app-plugins-forum-subforum-form",
  templateUrl: "./subforum-form.component.html",
  styleUrls: ["./subforum-form.component.scss"]
})
export class ForumSubforumFormComponent implements OnInit {
  public isSectioned: boolean = false;
  public cancelLink: string;

  public subforumForm: FormGroup = this.fb.group({
    id: ["", Validators.required],
    name: ["", Validators.required],
    alias: ["", Validators.required],
    description: ["", Validators.required],
    sectionItems: [""]
  });

  constructor(
    //private subforumEntityService: SubforumEntityService,
    private subforumService: ForumSubforumService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.cancelLink = "/forum";
  }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params["id"];
      if (id) {
        this.subforumService.get(id).subscribe(subforum => {
          this.set(subforum);
        });
      }

      var contentSectionItems = params["path"];
      if (contentSectionItems) {
        this.isSectioned = true;
        this.setSection(contentSectionItems);
      }
    });
  }

  private set(subforum: Subforum) {
    this.subforumForm.patchValue({
      id: subforum.id,
      name: subforum.name,
      alias: subforum.alias,
      description: subforum.description,
      sectionItems: subforum.sectionItems
    });
    this.cancelLink =
      "/forum/sub/" + subforum.alias + "/" + subforum.sectionItems;
  }

  private setSection(contentSectionItems: string) {
    this.subforumForm.patchValue({
      sectionItems: contentSectionItems
    });
    this.cancelLink = "/forum/" + contentSectionItems;
  }

  public save() {
    // this.isRequesting = true;
    var id = this.subforumForm.value["id"];
    var alias = this.subforumForm.value["alias"];
    var sectionItems = this.subforumForm.value["sectionItems"];
    this.subforumService
      .addOrUpdate(
        id,
        this.subforumForm.value["name"],
        alias,
        this.subforumForm.value["description"],
        sectionItems
      )
      .subscribe(
        result => {
          this.router.navigate(["/forum/sub/" + alias + "/" + sectionItems]);
        }
        //errors =>  this.errors = errors
      );
  }
}
