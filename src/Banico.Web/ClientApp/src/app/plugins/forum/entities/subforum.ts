import { ContentItem } from "../../../entities/content-item";

export class Subforum {
  id: string;
  name: string;
  alias: string;
  description: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'subforum')) {
      this.id = contentItem.id;
      this.name = contentItem.name;
      this.alias = contentItem.alias;
      this.description = contentItem.content;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = 'subforum';
    output.id = this.id;
    output.name = this.name;
    output.alias = this.alias;
    output.content = this.description;
    
    return output;
  }
}