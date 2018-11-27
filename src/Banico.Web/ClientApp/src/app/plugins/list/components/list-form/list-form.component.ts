import { Component, OnInit } from '@angular/core';
import { Identifiers } from '@angular/compiler';
import { FormsModule, NgForm, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { ListItemService } from '../../services/list-item.service';
import { List } from '../../entities/list';
import { ListSet } from '../../entities/list-set';
import { ListItem } from '../../entities/list-item';

@Component({
  selector: 'list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css']
})
export class ListFormComponent implements OnInit {
  public list: List;
  public listSet: ListSet;
  public listItems: ListItem[];

  public listForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    listSetId: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(
    private listService: ListService,
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
        this.listService.get(id)
          .subscribe(list => {
           this.set(list);
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

  private set(list: List) {
    this.listForm.patchValue({
      id: list.id,
      listSetId: list.listSetId,
      name: list.name,
      description: list.description
    });
    this.setListItems(list.listSetId, list.listItems);
  }

  private setListSetId(listSetId: string) {
    this.listForm.patchValue({
      listSetId: listSetId
    });
    this.setListItems(listSetId, '');
  }

  private setListItems(listSetId: string, listItems: string) {
    const listItemStringArray: string[] = listItems.split(',');
    this.listItemService.getListItems(listSetId)
      .subscribe(
        listItems => {
          this.listItems = listItems;
          this.listForm.addControl('listItems', this.buildListItems(listItems, listItemStringArray));
        }
      )
  }

  private buildListItems(listItems: ListItem[], listItemStringArray: string[]): FormArray {
    const listItemArray = listItems.map(listItem => {
      var toggle: boolean = false;
      if (listItemStringArray.indexOf(listItem.id) > -1) {
        toggle = true;
      }
      return this.fb.control(toggle);
    });

    return this.fb.array(listItemArray);
  }

  private getListItems(): string {
    var selectedItemsArray: string[] = this.listForm.value['listItems'].map((selected, i) => {
      if (selected) {
        return this.listItems[i].name;
      } else {
        return '';
      }
    });
    return selectedItemsArray.join(',');
  }

  public save() {
    // this.isRequesting = true;
    this.listService.addOrUpdate(
      this.listForm.value['id'],
      this.listForm.value['listSetId'],
      this.listForm.value['name'],
      this.listForm.value['description'],
      this.getListItems()
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
