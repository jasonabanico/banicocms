import { Component } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../../entities/user';
import { UsersService } from '../../main/users.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: []
})
export class UserFormComponent {
  private sub: any;
  public isSuccessful: boolean;
  public isRequesting: boolean;
  public errors: string;  
  public user: User;

  public userForm: FormGroup = this.fb.group({
    id: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    alias: ['', Validators.required],
    email: ['', Validators.required]
  });

  constructor(
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { 
  }

  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        var id = params['id'];
        this.usersService.get(id)
          .subscribe(user => {
            this.set(user);
          });
      }
    });
  }

  private set(user: User) {
    this.userForm.patchValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      alias: user.alias,
      email: user.email
    });
  }

  public save() {
    this.isRequesting = true;
    this.usersService.addOrUpdate(
      this.userForm.value['id'],
      this.userForm.value['email'],
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