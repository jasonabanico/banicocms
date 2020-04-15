import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Video } from "../entities/video";

@Injectable()
export class VideoOEmbedService {
  constructor(private http: HttpClient) {}

  public async getOEmbed(video: Video): Promise<Video> {
    let url;

    // YouTube
    const youTubeRegex =
      "(?:https?:/{2})?(?:w{3}.)?youtu(?:be)?.(?:com|be)(?:/watch?v=|/)([^&]+)";
    if (video.url.match(youTubeRegex))
      url = "https://www.youtube.com/oembed?url=" + video.url + "&format=json";

    if (url) {
      var json = await this.callOEmbed(url);
      if (json != null) {
        return this.setOEmbedValues(video, json);
      }
    }

    return Promise.resolve(video);
  }

  public setOEmbedValues(video: Video, json: any) {
    video.title = json.title;
    video.thumbnailUrl = json.thumbnail_url;
    video.thumbnailHeight = json.thumbnail_height.toString();
    video.thumbnailWidth = json.thumbnail_width.toString();
    return video;
  }

  private async callOEmbed(url: string): Promise<any> {
    let response = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
      mode: "no-cors"
    });
    if (response == null) return Promise.resolve(null);
    let json = await response.json();
    return json;
  }
}
