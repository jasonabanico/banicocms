import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListItem } from '../../entities/list-item';
import { ListItemService } from '../../services/list-item.service';
import { Identifiers } from '@angular/compiler';

@Component({
  selector: 'app-plugins-list-item-form',
  templateUrl: './list-item-form.component.html',
  styleUrls: ['./list-item-form.component.css']
})
export class ListItemFormComponent implements OnInit {
  public listItem: ListItem;

  public listItemForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    listSetId: ['', Validators.required],
    name: ['', Validators.required],
    alias: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(
    private listItemService: ListItemService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) {
}

public ngOnInit() {
  this.route.params.subscribe(params => {
    if (params['id']) {
      var id = params['id'];
      this.listItemService.get(id)
        .subscribe(listItem => {
          this.set(listItem);
        });
    }
  });

  this.route.queryParams
    .subscribe(params => {
      if (params.listSetId) {
        this.setListSetId(params.listSetId);
      }
    });
  }

  private set(listItem: ListItem) {
    this.listItemForm.patchValue({
      id: listItem.id,
      listSetId: listItem.listSetId,
      name: listItem.name,
      alias: listItem.alias,
      description: listItem.description
    });
  }

  private setListSetId(listSetId: string) {
    this.listItemForm.patchValue({
      listSetId: listSetId
    });
  }

  public save() {
    // this.isRequesting = true;
    this.listItemService.addOrUpdate(
      this.listItemForm.value['id'],
      this.listItemForm.value['listSetId'],
      this.listItemForm.value['name'],
      this.listItemForm.value['alias'],
      this.listItemForm.value['description']
    )
    //.finally(() => this.isRequesting = false)
    .subscribe(
      result  => {
        // this.isSuccessful = true;
      },
      //errors =>  this.errors = errors
      );
  }

}
