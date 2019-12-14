import { ContentItem } from "../../../../entities/content-item";
import * as moment from "moment";

export class Comment {
  id: string;
  text: string;
  postId: string;
  userId: string;
  username: string;
  avatarHash: string;
  createdDate: string;
  createdDateTicks: number;
  updatedDate: string;
  updatedDateTicks: number;

  constructor(private contentItem: ContentItem) {
    if (
      contentItem &&
      contentItem.module === "forum" &&
      contentItem.type === "comment"
    ) {
      this.id = contentItem.id;
      this.text = contentItem.content;
      this.postId = contentItem.parentId;
      this.userId = contentItem.createdBy;
      this.createdDate = contentItem.createdDate;
      this.createdDateTicks = contentItem.createdDateTicks;
      this.updatedDate = contentItem.updatedDate;
      this.updatedDateTicks = contentItem.updatedDateTicks;
    }
  }

  public toContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = "forum";
    output.type = "comment";
    output.id = this.id;
    output.content = this.text;
    output.parentId = this.postId;

    return output;
  }

  public clone(): Comment {
    let contentItem = this.toContentItem();
    return new Comment(contentItem);
  }

  public formattedDate(): string {
    return moment(this.createdDate).format("MMMM Do YYYY, h:mm:ss a");
  }

  public fromNow(): string {
    return moment(this.createdDate).fromNow();
  }
}
