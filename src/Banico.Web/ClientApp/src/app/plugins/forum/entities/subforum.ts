import { ContentItem } from "../../../entities/content-item";

export class Subforum {
  id: string;
  name: string;
  description: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'subforum')) {
      this.id = contentItem.id;
      this.name = contentItem.alias;
      this.description = contentItem.content;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = 'subforum';
    output.id = this.id;
    output.alias = this.name;
    output.content = this.description;
    
    return output;
  }
}