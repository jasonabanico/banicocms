import { ContentItem } from "../../../entities/content-item";

export class ListItem {
  id: string;
  name: string;
  description: string;
  listSet: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'list-item')) {
      this.id = contentItem.id;
      this.name = contentItem.name;
      this.description = contentItem.content;
      this.listSet = contentItem.parentId;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = 'list-item';
    output.id = this.id;
    output.name = this.name;
    output.content = this.description;
    output.parentId = this.listSet;
    
    return output;
  }
}