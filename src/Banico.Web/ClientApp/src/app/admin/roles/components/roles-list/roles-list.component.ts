import { Component, Inject } from "@angular/core";
import { Role } from "../../../../entities/role";
import { RolesService } from "../../main/roles.service";

@Component({
    selector: 'app-rolelist',
    templateUrl: './roles-list.component.html',
    providers: []
})
export class RolesListComponent {
    public roles: Role[];

    constructor(
        @Inject(RolesService) public rolesService: RolesService
    ) {
    }

    ngOnInit() {
        this.roles = new Array();
        this.rolesService.getAll()
            .subscribe(roles => this.setRoles(roles));
    }

    private setRoles(roles: Role[])
    {
        this.roles = roles;
    }
}