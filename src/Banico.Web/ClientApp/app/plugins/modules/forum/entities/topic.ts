import { ContentItem } from "../../../../entities/content-item";
import * as moment from "moment";

export class Topic {
  id: string;
  title: string;
  text: string;
  snippet: string;
  subForumId: string;
  userId: string;
  username: string;
  avatarHash: string;
  createdDate: string;
  createdDateTicks: number;
  updatedDate: string;
  updatedDateTicks: number;
  postCount: number;

  constructor(private contentItem: ContentItem) {
    if (contentItem && contentItem.module == "forum-topic") {
      this.id = contentItem.id;
      this.title = contentItem.name;
      this.text = contentItem.content;
      this.snippet = contentItem.snippet;
      this.userId = contentItem.createdBy;
      this.subForumId = contentItem.parentId;
      this.createdDate = contentItem.createdDate;
      this.createdDateTicks = contentItem.createdDateTicks;
      this.updatedDate = contentItem.updatedDate;
      this.updatedDateTicks = contentItem.updatedDateTicks;
      this.postCount = contentItem.childCount;
    }
  }

  public toContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = "forum-topic";
    output.id = this.id;
    output.name = this.title;
    output.content = this.text;
    output.parentId = this.subForumId;

    return output;
  }

  public clone(): Topic {
    let contentItem = this.toContentItem();
    return new Topic(contentItem);
  }

  public formattedDate(): string {
    return moment(this.createdDate).format("MMMM Do YYYY, h:mm:ss a");
  }

  public fromNow(): string {
    return moment(this.createdDate).fromNow();
  }
}
