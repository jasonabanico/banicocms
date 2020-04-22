import { Injectable, Inject } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Channel } from "../entities/channel";
import { Video } from "../entities/video";
import { ContentItemSearch } from "../../../entities/contentItemSearch";
import { Router, ActivatedRoute } from "@angular/router";
import { PluginService } from "../../../services/plugin.service";
import { ContentItem } from "../../../../entities/content-item";

@Injectable()
export class VideosService extends PluginService {
  public getChannel(id: string): Observable<Channel> {
    var contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "videos";
    contentItemSearch.type = "channel";
    contentItemSearch.id = id;

    return this.contentItemService.getOne(contentItemSearch).pipe(
      map(item => {
        return new Channel(item);
      })
    );
  }

  public getChannelByAlias(alias: string): Observable<Channel> {
    var contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "videos";
    contentItemSearch.type = "channel";
    contentItemSearch.alias = alias;

    return this.contentItemService.getOne(contentItemSearch).pipe(
      map(item => {
        return new Channel(item);
      })
    );
  }

  public getVideo(id: string): Observable<Video> {
    var contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "videos";
    contentItemSearch.type = "video";
    contentItemSearch.id = id;

    return this.contentItemService.getOne(contentItemSearch).pipe(
      map(item => {
        return new Video(item);
      })
    );
  }

  public getChannelsBySectionItems(
    sectionItems: string
  ): Observable<Channel[]> {
    var contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "videos";
    contentItemSearch.type = "channel";
    contentItemSearch.sectionItems = sectionItems;
    contentItemSearch.orderBy = "attribute01";

    return this.contentItemService.getAll(contentItemSearch).pipe(
      map(contentItems => {
        var channels: Channel[] = new Array<Channel>();
        contentItems.forEach(function(item: ContentItem) {
          channels.push(new Channel(item));
        });

        return channels;
      })
    );
  }

  public getVideos(channelId: string): Observable<Video[]> {
    var contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "videos";
    contentItemSearch.type = "video";
    contentItemSearch.parentId = channelId;
    contentItemSearch.orderBy = "attribute01";

    return this.contentItemService.getAll(contentItemSearch).pipe(
      map(contentItems => {
        var videos: Video[] = new Array<Video>();
        contentItems.forEach(function(item: ContentItem) {
          videos.push(new Video(item));
        });

        return videos;
      })
    );
  }

  public getFirstVideo(channelId: string): Observable<Video> {
    var contentItemSearch = new ContentItemSearch();
    contentItemSearch.module = "videos";
    contentItemSearch.type = "video";
    contentItemSearch.parentId = channelId;
    contentItemSearch.page = 0;
    contentItemSearch.pageSize = 1;
    contentItemSearch.orderBy = "attribute01";

    return this.contentItemService.getAll(contentItemSearch).pipe(
      map(contentItems => {
        if (contentItems.length > 0) {
          var video = new Video(contentItems[0]);
          return video;
        } else return null;
      })
    );
  }
  public addOrUpdateChannel(channel: Channel): Observable<string> {
    let contentItem: ContentItem = channel.toContentItem();
    return this.contentItemService
      .addOrUpdate(contentItem)
      .pipe(catchError(this.handleError));
  }

  public addOrUpdateVideo(video: Video): Observable<string> {
    let contentItem: ContentItem = video.toContentItem();
    return this.contentItemService
      .addOrUpdate(contentItem)
      .pipe(catchError(this.handleError));
  }

  public delete(id: string): Observable<string> {
    return this.contentItemService
      .delete(id)
      .pipe(catchError(this.handleError));
  }

  public getOEmbedVideo(service: string, video: Video): Observable<Video> {
    if (video.url) {
      return this.getOEmbed(service, video.url).pipe(
        map(json => {
          if (json != null) {
            return this.setOEmbedValues(video, json);
          } else {
            return video;
          }
        })
      );
    }

    return null;
  }

  public setOEmbedValues(video: Video, jsonStr: string) {
    const json = JSON.parse(jsonStr);
    video.title = json.title;
    video.thumbnailUrl = json.thumbnail_url;
    video.thumbnailHeight = json.thumbnail_height.toString();
    video.thumbnailWidth = json.thumbnail_width.toString();
    return video;
  }
}
