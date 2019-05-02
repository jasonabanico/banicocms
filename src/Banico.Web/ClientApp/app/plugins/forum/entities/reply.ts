import { ContentItem } from "../../../entities/content-item";

export class Reply {
  id: string;
  text: string;
  topicId: string;
  userId: string;
  username: string;
  avatarHash: string;
  createdDate: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'reply')) {
      this.id = contentItem.id;
      this.text = contentItem.content;
      this.topicId = contentItem.parentId;
      this.userId = contentItem.createdBy;
      this.createdDate = contentItem.createdDate;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = 'reply';
    output.id = this.id;
    output.content = this.text;
    output.parentId = this.topicId;
    
    return output;
  }
}