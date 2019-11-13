import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../shared/services/auth.service";
import { TenantService } from "../../services/tenant.service";

@Component({
  selector: "app-admin-set-tenant-home",
  templateUrl: "./home.component.html"
})
export class AdminSetTenantHomeComponent implements OnInit {
  public tenantForm: FormGroup = this.fb.group({
    tenant: ["", Validators.required]
  });

  constructor(
    private authService: AuthService,
    private tenantService: TenantService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    var tenant = this.authService.getTenant();
    this.tenantForm.patchValue({
      tenant: tenant
    });
  }

  public save() {
    var tenant = this.tenantForm.value["tenant"];

    this.tenantService.setTenant(tenant).subscribe((user: any) => {
      return true;
    });
  }
}
