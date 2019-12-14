import { finalize } from "rxjs/operators";
import { Component, OnInit, Inject } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "../../../../shared/services/toastr.service";
import { SectionsService } from "../../../../shared/services/sections.service";
import { Section } from "../../../../entities/section";

@Component({
  selector: "app-admin-sections-section",
  templateUrl: "./section.component.html",
  providers: [SectionsService]
})
export class AdminSectionsSectionComponent implements OnInit {
  public isSuccessful: boolean;
  public isRequesting: boolean;
  public errors: string;
  public sections: Section[];
  public section: Section;

  public sectionForm: FormGroup = this.fb.group({
    id: [""],
    name: ["", Validators.required],
    modules: ["", Validators.required]
  });

  constructor(
    private toastrService: ToastrService,
    private sectionsService: SectionsService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sections = new Array();
    this.section = new Section();
    this.sectionsService
      .getSections("", "", "")
      .subscribe(sections => this.setSections(sections));
  }

  private setSections(sections: Section[]) {
    this.sections = sections;
  }

  public save() {
    this.sectionsService
      .addOrUpdateSection(
        this.sectionForm.value["id"],
        this.sectionForm.value["name"],
        this.sectionForm.value["modules"]
      )
      .pipe(finalize(() => (this.isRequesting = false)))
      .subscribe(
        result => {
          this.isSuccessful = true;
          window.location.reload();
        },
        errors => {
          this.errors = errors;
          this.toastrService.showErrorMessage("Save failed.");
        }
      );
  }

  private saveSuccess(section: Section) {
    if (section.id) {
      this.section = section;
      this.sections.push(this.section);
      this.section = new Section();
      window.location.reload();
    } else {
      this.toastrService.showErrorMessage("Save failed.");
    }
  }

  private SaveResponse(data: any) {
    if (data !== null) {
      if (data.value !== null) {
        if (data.value === "0") {
          alert("Saved.");
        } else {
          alert("Save failed.");
        }
      } else {
        alert("Save failed.");
      }
    } else {
      alert("Save failed.");
    }
  }
}
