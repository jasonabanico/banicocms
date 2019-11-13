import { Component } from "@angular/core";
import { ConfigsService } from "../config/services/configs.service";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "app-admin-home",
  templateUrl: "./home.component.html",
  providers: []
})
export class AdminHomeComponent {
  isInitialized: boolean;
  isSuperAdmin: boolean = false;
  configsAllowed: boolean = false;
  sectionsAllowed: boolean = false;
  rolesAllowed: boolean = false;
  usersAllowed: boolean = false;

  constructor(
    private configsService: ConfigsService,
    private authService: AuthService
  ) {}

  public ngOnInit() {
    this.configsService.initialized().subscribe(result => {
      this.isInitialized = result;
      if (this.isInitialized) {
        this.setPermissions();
      }
    });
  }

  public initialize() {
    this.configsService
      .setInitialSettings()
      .subscribe(result => (this.isInitialized = result));
    this.setPermissions();
  }

  private setPermissions() {
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.authService
      .canAccess("admin/configs/manage", "", false)
      .subscribe(result => (this.configsAllowed = result));
    this.authService
      .canAccess("admin/sections/manage", "", false)
      .subscribe(result => (this.sectionsAllowed = result));
    this.authService
      .canAccess("admin/roles/manage", "", false)
      .subscribe(result => (this.rolesAllowed = result));
    this.authService
      .canAccess("admin/users/manage", "", false)
      .subscribe(result => (this.usersAllowed = result));
  }
}
