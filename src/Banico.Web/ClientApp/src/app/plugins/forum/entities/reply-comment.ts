import { ContentItem } from "../../../entities/content-item";

export class ReplyComment {
  id: string;
  text: string;
  replyId: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'reply-comment')) {
      this.id = contentItem.id;
      this.text = contentItem.content;
      this.replyId = contentItem.parentId;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = 'reply-comment';
    output.id = this.id;
    output.content = this.text;
    output.parentId = this.replyId;
    
    return output;
  }
}