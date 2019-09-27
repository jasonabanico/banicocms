import {finalize} from 'rxjs/operators';
import { Component } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Role } from "../../../../entities/role";
import { RolesService } from "../../services/roles.service";

@Component({
    selector: 'app-admin-roles-form',
    templateUrl: './form.component.html',
    providers: []
})
export class AdminRolesFormComponent {
  private sub: any;
  public isSuccessful: boolean;
  public isRequesting: boolean;
  public errors: string;
  public role: Role;
  
  public roleForm: FormGroup = this.fb.group({
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
    ).pipe(
    finalize(() => this.isRequesting = false))
    .subscribe(
      result  => {
        this.isSuccessful = true;
      },
      errors =>  this.errors = errors);
  }
}
