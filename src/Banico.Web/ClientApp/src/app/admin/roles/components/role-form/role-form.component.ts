import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Role } from "../../../../entities/role";
import { RolesService } from "../../main/roles.service";

@Component({
    selector: 'role-form',
    templateUrl: './role-form.component.html',
    providers: []
})
export class RoleFormComponent {
  private sub: any;
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
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { 
  }

  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        var id = params['id'];
        this.rolesService.get(id)
          .subscribe(user => {
            this.set(user);
          });
      }
    });
  }

  private set(role: Role) {
    this.roleForm.patchValue({
      id: role.id,
      name: role.name
    });
  }

  public save() {
    this.isRequesting = true;
    this.rolesService.addOrUpdate(
      this.roleForm.value['id'],
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
