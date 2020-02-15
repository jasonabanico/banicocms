import { Injectable, Inject } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { PersonProfile } from "../entities/person-profile";
import { ContentItemSearch } from "../../../entities/contentItemSearch";
import { Router, ActivatedRoute } from "@angular/router";
import { PluginService } from "../../../services/plugin.service";
import { ContentItem } from "../../../../entities/content-item";
import { OrganizationProfile } from "../entities/organization-profile";

@Injectable()
export class ProfileService extends PluginService {
  public getPersonProfile(alias: string): Observable<PersonProfile> {
    var contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "profile";
    contentItemSearch.type = "in";
    contentItemSearch.alias = alias;

    return this.contentItemService.getOne(contentItemSearch).pipe(
      map(item => {
        return new PersonProfile(item);
      })
    );
  }

  public getOrganizationProfile(
    alias: string
  ): Observable<OrganizationProfile> {
    var contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "profile";
    contentItemSearch.type = "org";
    contentItemSearch.alias = alias;

    return this.contentItemService.getOne(contentItemSearch).pipe(
      map(item => {
        return new OrganizationProfile(item);
      })
    );
  }

  public getOrganizationProfilesBySectionItems(
    sectionItems: string
  ): Observable<OrganizationProfile[]> {
    var contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "profile";
    contentItemSearch.type = "org";
    contentItemSearch.sectionItems = sectionItems;

    return this.contentItemService.getAll(contentItemSearch).pipe(
      map(profiles => {
        var organizationProfiles: OrganizationProfile[] = new Array<
          OrganizationProfile
        >();
        profiles.forEach(function(item: ContentItem) {
          organizationProfiles.push(new OrganizationProfile(item));
        });

        return organizationProfiles;
      })
    );
  }

  public addOrUpdatePersonProfile(
    personProfile: PersonProfile
  ): Observable<boolean> {
    let contentItem: ContentItem = personProfile.toContentItem();
    return this.contentItemService.addOrUpdate(contentItem).pipe(
      map(res => {
        return true;
      }),
      catchError(this.handleError)
    );
  }

  public addOrUpdateOrganizationProfile(
    organizationProfile: OrganizationProfile
  ): Observable<boolean> {
    let contentItem: ContentItem = organizationProfile.toContentItem();
    return this.contentItemService.addOrUpdate(contentItem).pipe(
      map(res => {
        return true;
      }),
      catchError(this.handleError)
    );
  }
}
