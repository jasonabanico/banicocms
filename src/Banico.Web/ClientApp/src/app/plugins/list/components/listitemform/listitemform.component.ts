import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListItem } from '../../main/listitem';
import { ListItemService } from '../../main/listitem.service';

@Component({
  selector: 'listitemform',
  templateUrl: './listitemform.component.html',
  styleUrls: ['./listitemform.component.css']
})
export class ListItemFormComponent implements OnInit {
  public listItem: ListItem;

  listItemForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(
    private listItemService: ListItemService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  public save() {
    // this.isRequesting = true;
    // this.listItemService.addOrUpdate(
    //   this.roleForm.value['id'],
    //   this.roleForm.value['name']
    // )
    // .finally(() => this.isRequesting = false)
    // .subscribe(
    //   result  => {
    //     this.isSuccessful = true;
    //   },
    //   errors =>  this.errors = errors);
  }

}
