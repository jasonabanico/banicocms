import { ContentItem } from "../../../entities/content-item";

export class Subforum {
  id: string;
  title: string;
  text: string;
  subForumId: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'topic')) {
      this.id = contentItem.id;
      this.title = contentItem.name;
      this.text = contentItem.content;
      this.subForumId = contentItem.parentId;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = 'topic';
    output.id = this.id;
    output.name = this.title;
    output.content = this.text;
    output.parentId = this.subForumId;
    
    return output;
  }
}