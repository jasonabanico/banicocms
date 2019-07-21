import { ContentItem } from "../../../entities/content-item";

export class Topic {
  id: string;
  title: string;
  text: string;
  subForumId: string;
  userId: string;
  username: string;
  avatarHash: string;
  createdDate: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'forum-topic')) {
      this.id = contentItem.id;
      this.title = contentItem.name;
      this.text = contentItem.content;
      this.userId = contentItem.createdBy;
      this.subForumId = contentItem.parentId;
      this.createdDate = contentItem.createdDate;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = 'forum-topic';
    output.id = this.id;
    output.name = this.title;
    output.content = this.text;
    output.parentId = this.subForumId;
    
    return output;
  }
}