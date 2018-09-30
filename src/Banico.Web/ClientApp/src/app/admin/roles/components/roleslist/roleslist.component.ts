import { Component } from "@angular/core";
import { Role } from "../../../../entities/role";

@Component({
    selector: 'rolelist',
    templateUrl: './roleslist.component.html',
    providers: []
})
export class RolesListComponent {
    public roles: Role[];
}