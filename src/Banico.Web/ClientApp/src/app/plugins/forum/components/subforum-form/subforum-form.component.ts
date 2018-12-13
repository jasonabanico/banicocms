import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subforum } from '../../entities/subforum';
import { SubforumService } from '../../services/subforum.service';

@Component({
  selector: 'app-subforum-form',
  templateUrl: './subforum-form.component.html',
  styleUrls: ['./subforum-form.component.scss']
})
export class SubforumFormComponent implements OnInit {

  public subforumForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    alias: ['', Validators.required],
    description: ['', Validators.required],
    sectionItems: ['', Validators.required]
  });

  constructor(
    private subforumService: SubforumService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) {
  }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        var id = params['id'];
        this.subforumService.get(id)
          .subscribe(subforum => {
           this.set(subforum);
          });
        }
    });
  }

  private set(subforum: Subforum) {
    this.subforumForm.patchValue({
      id: subforum.id,
      name: subforum.name,
      alias: subforum.alias,
      description: subforum.description
    });
  }

  public save() {
    // this.isRequesting = true;
    var alias = this.subforumForm.value['alias'];
    this.subforumService.addOrUpdate(
      this.subforumForm.value['id'],
      this.subforumForm.value['name'],
      alias,
      this.subforumForm.value['description'],
      this.subforumForm.value['sectionItems']
    )
    .subscribe(
      id => {
        this.router.navigate(['/forum/subforum/' + alias]);
      },
      //errors =>  this.errors = errors
      );
  }

}
