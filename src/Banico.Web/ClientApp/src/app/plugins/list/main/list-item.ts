import { ContentItem } from "../../../entities/content-item";

export class ListItem {
  id: string;
  name: string;
  description: string;
  sectionItems: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'listitem')) {
      this.id = contentItem.id;
      this.name = contentItem.name;
      this.description = contentItem.content;
      this.sectionItems = contentItem.sectionItems;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = 'listitem';
    output.id = this.id;
    output.name = this.name;
    output.content = this.description;
    output.sectionItems = this.sectionItems;
    
    return output;
  }
}