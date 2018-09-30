import { Component } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../../entities/user';
import { UsersService } from '../../main/users.service';

@Component({
  selector: 'userform',
  templateUrl: './userform.component.html',
  styleUrls: []
})
export class UserFormComponent {
  isSuccessful: boolean;
  isRequesting: boolean;
  errors: string;  
  user: User;

  userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    alias: ['', Validators.required],
    email: ['', Validators.required]
  });

  constructor(
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) { 
  }

public save() {
  this.isRequesting = true;
  this.usersService.addUser(
    this.userForm.value['firstName'],
    this.userForm.value['lastName'],
    this.userForm.value['alias'],
    this.userForm.value['email']
  )
  .finally(() => this.isRequesting = false)
  .subscribe(
    result  => {
      this.isSuccessful = true;
    },
    errors =>  this.errors = errors);
  }
}