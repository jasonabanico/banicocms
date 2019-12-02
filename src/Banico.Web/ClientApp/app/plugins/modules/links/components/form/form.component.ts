import { Component, OnInit } from '@angular/core';
import { Identifiers } from '@angular/compiler';
import { FormsModule, NgForm, FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SectionBarService } from '../../../../../shared/services/section-bar.service';
import { LinksService } from '../../services/links.service';
import { Link } from '../../entities/link';

@Component({
  selector: 'app-plugins-links-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class LinksFormComponent implements OnInit {
  public link: Link;

  public linkForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    sectionItems: ['', Validators.required],
    url: ['', Validators.required]
  });

  constructor(
    private sectionBarService: SectionBarService,
    public linksService: LinksService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) {
  }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = params['id'];
        this.linksService.get(id)
          .subscribe(link => {
           this.set(link);
          });
        }

      if (params['path']) {
        const sectionItems = params['path'];
        this.sectionBarService.initialize('link', sectionItems, '', '/links');
        this.linkForm.patchValue({
          sectionItems: sectionItems
        });
      }
    });
  }

  private set(link: Link) {
    this.linkForm.patchValue({
      id: link.id,
      name: link.name,
      sectionItems: link.sectionItems,
      description: link.description,
      url: link.url
    });
  }

  public save() {
    // this.isRequesting = true;
    this.linksService.addOrUpdate(
      this.linkForm.value['id'],
      this.linkForm.value['name'],
      this.linkForm.value['sectionItems'],
      this.linkForm.value['description'],
      this.linkForm.value['url']
    )
    .subscribe(
      id => {
        this.router.navigate(['/links/link/' + id]);
      },
      //errors =>  this.errors = errors
      );
  }

}
