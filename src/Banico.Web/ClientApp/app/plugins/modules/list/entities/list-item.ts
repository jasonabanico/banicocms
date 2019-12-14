import { ContentItem } from "../../../../entities/content-item";

export class ListItem {
  id: string;
  listSetId: string;
  name: string;
  alias: string;
  description: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module === 'list-item')) {
      this.id = contentItem.id;
      this.listSetId = contentItem.parentId;
      this.name = contentItem.name;
      this.alias = contentItem.alias;
      this.description = contentItem.content;
    }
  }

  public toContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = 'list-item';
    output.id = this.id;
    output.parentId = this.listSetId;
    output.name = this.name;
    output.alias = this.alias;
    output.content = this.description;
    
    return output;
  }
}