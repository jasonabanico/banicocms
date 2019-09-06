import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subforum } from '../../entities/subforum';
import { SubforumEntityService } from '../../services/subforum-entity.service';
import { SubforumService } from '../../services/subforum.service';

@Component({
  selector: 'app-plugins-forum-subforum-form',
  templateUrl: './subforum-form.component.html',
  styleUrls: ['./subforum-form.component.scss']
})
export class SubforumFormComponent implements OnInit {

  public subforumForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    alias: ['', Validators.required],
    description: ['', Validators.required],
    sectionItems: ['']
  });

  constructor(
    //private subforumEntityService: SubforumEntityService,
    private subforumService: SubforumService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) {
  }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id'];
      if (id) {
        this.subforumService.get(id)
        .subscribe(subforum => {
          this.set(subforum);
        });
      }
    });

    this.route.queryParams
      .subscribe(params => {
        var contentSectionItems = params['section'];
        if (contentSectionItems) {
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
      sectionItems: ''
    });
  }

  private setSection(contentSectionItems: string) {
    this.subforumForm.patchValue({
      sectionItems: contentSectionItems
    });
  }

  public save() {
    // this.isRequesting = true;
    var id = this.subforumForm.value['id'];
    var alias = this.subforumForm.value['alias'];
    this.subforumService.addOrUpdate(
      id,
      this.subforumForm.value['name'],
      alias,
      this.subforumForm.value['description'],
      this.subforumForm.value['sectionItems']
    )
    .subscribe(
      result => {
        this.router.navigate(['/forum/subforum/' + alias]);
      },
      //errors =>  this.errors = errors
      );
  }

}
