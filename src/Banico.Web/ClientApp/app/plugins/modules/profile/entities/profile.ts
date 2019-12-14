import { ContentItem } from "../../../../entities/content-item";
import * as moment from "moment";

export class Profile {
  id: string;
  alias: string;
  content: string;
  createdDate: string;
  updatedDate: string;
  avatarHash: string;
  type: string;
  headline: string;

  constructor(private contentItem: ContentItem) {
    if (contentItem && contentItem.module === "profile") {
      this.id = contentItem.id;
      this.alias = contentItem.alias;
      this.content = contentItem.content;
      this.createdDate = contentItem.createdDate;
      this.updatedDate = contentItem.updatedDate;
      this.avatarHash = contentItem.attribute01;
      this.type = contentItem.attribute02;
      this.headline = contentItem.attribute03;
    }
  }

  public toContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = "profile";
    output.id = this.id;
    output.alias = this.alias;
    output.content = this.content;
    output.attribute01 = this.avatarHash;
    output.attribute02 = this.type;
    output.attribute03 = this.headline;

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
