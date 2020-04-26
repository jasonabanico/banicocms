import { ContentItem } from "../../../../entities/content-item";
import * as moment from "moment";

export class Video {
  id: string;
  channelId: string;
  title: string;
  alias: string;
  description: string;
  snippet: string;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
  type: string;
  order: string;
  url: string;
  thumbnailUrl: string;
  thumbnailHeight: string;
  thumbnailWidth: string;

  constructor(private contentItem: ContentItem) {
    if (
      contentItem &&
      contentItem.module === "videos" &&
      contentItem.type === "video"
    ) {
      this.id = contentItem.id;
      this.channelId = contentItem.parentId;
      this.title = contentItem.name;
      this.alias = contentItem.alias;
      this.type = contentItem.type;
      this.description = contentItem.content;
      this.snippet = contentItem.snippet;
      this.createdBy = contentItem.createdBy;
      this.createdDate = contentItem.createdDate;
      this.updatedDate = contentItem.updatedDate;
      this.order = contentItem.attribute01;
      this.url = contentItem.attribute02;
      this.thumbnailUrl = contentItem.attribute03;
      this.thumbnailHeight = contentItem.attribute04;
      this.thumbnailWidth = contentItem.attribute05;
    }
  }

  public toContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = "videos";
    output.type = "video";
    output.id = this.id;
    output.parentId = this.channelId;
    output.name = this.title;
    output.alias = this.alias;
    output.content = this.description;
    output.attribute01 = this.order;
    output.attribute02 = this.url;
    output.attribute03 = this.thumbnailUrl;
    output.attribute04 = this.thumbnailHeight;
    output.attribute05 = this.thumbnailWidth;

    return output;
  }

  public formattedCreatedDate(): string {
    return moment(this.createdDate).format("MMMM Do YYYY, h:mm:ss a");
  }

  public formattedUpdatedDate(): string {
    return moment(this.updatedDate).format("MMMM Do YYYY, h:mm:ss a");
  }

  public createdFromNow(): string {
    return moment(this.createdDate).fromNow();
  }

  public updatedFromNow(): string {
    return moment(this.updatedDate).fromNow();
  }
}
