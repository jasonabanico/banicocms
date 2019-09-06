import { Component, OnInit } from '@angular/core';
import { Identifiers } from '@angular/compiler';
import { FormsModule, NgForm, FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { ListItemService } from '../../services/list-item.service';
import { List } from '../../entities/list';
import { ListSet } from '../../entities/list-set';
import { ListItem } from '../../entities/list-item';

@Component({
  selector: 'app-plugins-list-form',
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
        var listSetId = params['listSetId'];
        this.setListSetId(params.listSetId);
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
          this.buildListItems(listItems, listItemStringArray);
        }
      )
  }

  private buildListItems(listItems: ListItem[], listItemStringArray: string[]) {
    var i = 0;
    const listItemArray = listItems.map(listItem => {
      var toggle: boolean = false;
      if (listItemStringArray.indexOf(listItem.id) > -1) {
        toggle = true;
      }
      this.listForm.addControl('checkbox-'+i.toString(), new FormControl(toggle));
      i++;
    });
  }

  private getListItems(): string {
    var i = 0;
    var result: string = '';
    for (let listItem of this.listItems) {
      var selected: boolean = this.listForm.value['checkbox-'+i.toString()];
      if (selected) {
        if (result.length > 0) {
          result = result + ',';
        }
        result = result + listItem.id;
      }

      i++;
    }

    return result;
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
    .subscribe(
      id => {
        this.router.navigate(['/list/list/' + id]);
      },
      //errors =>  this.errors = errors
      );
  }

}
