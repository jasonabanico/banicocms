import { finalize } from "rxjs/operators";
import { Component } from "@angular/core";
import { NgForm, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../../../../entities/user";
import { UsersService } from "../../services/users.service";
import { RolesService } from "../../../roles/services/roles.service";
import { Role } from "../../../../entities/role";

@Component({
  selector: "app-admin-users-form",
  templateUrl: "./form.component.html",
  styleUrls: []
})
export class AdminUsersFormComponent {
  private sub: any;
  public isEdit: boolean = false;
  public roles: Role[];
  public roleId: string;
  public isSuccessful: boolean;
  public isRequesting: boolean;
  public errors: string;
  public user: User;

  public userForm: FormGroup = this.fb.group({
    id: [""],
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    alias: ["", Validators.required],
    email: ["", Validators.required]
  });

  public userRoleForm: FormGroup = this.fb.group({
    id: [""],
    roleId: ["", Validators.required]
  });

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params["id"]) {
        var id = params["id"];
        this.usersService.get(id).subscribe(user => {
          this.isEdit = true;
          this.set(user);
        });
        this.usersService.getUserRole(id).subscribe(roleId => {
          this.setRole(roleId);
        });
      }
    });
    this.rolesService.getAll().subscribe(roles => (this.roles = roles));
  }

  private set(user: User) {
    this.userForm.patchValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      alias: user.alias,
      email: user.email
    });
    this.userRoleForm.patchValue({
      id: user.id
    });
  }

  private setRole(roleId: string) {
    this.roleId = roleId;
    this.userRoleForm.patchValue({
      roleId: roleId
    });
  }

  public save() {
    this.isRequesting = true;
    this.usersService
      .addOrUpdate(
        this.userForm.value["id"],
        this.userForm.value["email"],
        this.userForm.value["firstName"],
        this.userForm.value["lastName"],
        this.userForm.value["alias"],
        this.userForm.value["email"]
      )
      .pipe(finalize(() => (this.isRequesting = false)))
      .subscribe(
        result => {
          this.isSuccessful = true;
        },
        errors => (this.errors = errors)
      );
  }

  public saveUserRole() {
    this.isRequesting = true;
    const id = this.userRoleForm.value["id"];
    const roleId = this.userRoleForm.value["roleId"];
    this.usersService
      .updateRole(id, roleId)
      .pipe(finalize(() => (this.isRequesting = false)))
      .subscribe(
        result => {
          this.isSuccessful = true;
        },
        errors => (this.errors = errors)
      );
  }
}
