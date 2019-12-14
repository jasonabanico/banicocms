import { ContentItem } from "../../../../entities/content-item";

export class List {
  id: string;
  name: string;
  description: string;
  listSetId: string;
  listItems: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module === 'list')) {
      this.id = contentItem.id;
      this.name = contentItem.name;
      this.description = contentItem.content;
      this.listSetId = contentItem.parentId;
      this.listItems = contentItem.attribute01;
    }
  }

  public toContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = "list";
    output.id = this.id;
    output.name = this.name;
    output.content = this.description;
    output.parentId = this.listSetId;
    output.attribute01 = this.listItems;
    
    return output;
  }
}