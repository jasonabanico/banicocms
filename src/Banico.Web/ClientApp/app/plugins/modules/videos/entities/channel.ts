import { ContentItem } from "../../../../entities/content-item";
import * as moment from "moment";

export class Channel {
  id: string;
  owners: string;
  ownerUserIds: string;
  name: string;
  alias: string;
  description: string;
  snippet: string;
  sectionItems: string;
  createdDate: string;
  updatedDate: string;
    type: string;
    thumbnailUrl: string;

  constructor(private contentItem: ContentItem) {
    if (
      contentItem &&
      contentItem.module === "videos" &&
      contentItem.type === "channel"
    ) {
      this.id = contentItem.id;
      this.owners = contentItem.owners;
      this.ownerUserIds = contentItem.ownerUserIds;
      this.name = contentItem.name;
      this.alias = contentItem.alias;
      this.type = contentItem.type;
      this.description = contentItem.content;
      this.snippet = contentItem.snippet;
      this.sectionItems = contentItem.sectionItems;
      this.createdDate = contentItem.createdDate;
      this.updatedDate = contentItem.updatedDate;
    }
  }

  public toContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = "videos";
    output.type = "channel";
    output.id = this.id;
    output.owners = this.owners;
    output.name = this.name;
    output.alias = this.alias;
    output.content = this.description;
    output.sectionItems = this.sectionItems;

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
