import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Role } from "../../../../entities/role";
import { RolesService } from "../../main/roles.service";

@Component({
    selector: 'roleform',
    templateUrl: './roleform.component.html',
    providers: []
})
export class RoleFormComponent {
    isSuccessful: boolean;
    isRequesting: boolean;
    errors: string;
    role: Role;
  
    roleForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required]
    });
  
    constructor(
      private rolesService: RolesService,
      private router: Router,
      private fb: FormBuilder
    ) { 
    }

    public save() {
      this.isRequesting = true;
      this.rolesService.addRole(
        this.roleForm.value['name']
      )
      .finally(() => this.isRequesting = false)
      .subscribe(
        result  => {
          this.isSuccessful = true;
        },
        errors =>  this.errors = errors);
    }
}
