import { Injectable, Inject } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Profile } from "../entities/profile";
import { ContentItemSearch } from "../../../entities/contentItemSearch";
import { Router, ActivatedRoute } from "@angular/router";
import { PluginService } from "../../../services/plugin.service";
import { ContentItem } from "../../../../entities/content-item";

@Injectable()
export class ProfileService extends PluginService {
  public get(id: string): Observable<Profile> {
    return this.contentItemService.get(id).pipe(
      map(item => {
        return new Profile(item);
      })
    );
  }

  public getByTypeAndAlias(type: string, alias: string): Observable<Profile> {
    var contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "profile";
    contentItemSearch.attribute02 = type;
    contentItemSearch.alias = alias;

    return this.contentItemService.getOne(contentItemSearch).pipe(
      map(item => {
        return new Profile(item);
      })
    );
  }

  public addOrUpdate(profile: Profile): Observable<boolean> {
    let contentItem: ContentItem = profile.toContentItem();
    return this.contentItemService.addOrUpdate(contentItem).pipe(
      map(res => {
        return true;
      }),
      catchError(this.handleError)
    );
  }
}
