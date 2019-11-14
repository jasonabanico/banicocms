import { catchError, map } from "rxjs/operators";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseService } from "../../../shared/services/base.service";
import { WindowRefService } from "../../../shared/services/windowref.service";

@Injectable()
export class TenantService extends BaseService {
  constructor(
    private http: HttpClient,
    @Inject(WindowRefService) windowRefService: WindowRefService,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject("BASE_URL") private baseUrl: string
  ) {
    super(windowRefService, platformId);
  }

  public setTenant(tenant: string): Observable<Object> {
    let body = JSON.stringify({
      tenant
    });
    return this.http
      .post(
        this.baseUrl + "api/Account/SetTenant",
        body,
        this.jsonAuthRequestOptions()
      )
      .pipe(catchError(this.handleError));
  }
}
