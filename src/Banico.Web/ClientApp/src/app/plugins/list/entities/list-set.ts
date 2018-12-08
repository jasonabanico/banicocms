import { ContentItem } from "../../../entities/content-item";
import { ContentSectionItem } from "../../../entities/content-section-item";

export class ListSet {
  id: string;
  name: string;
  alias: string;
  description: string;
  contentSectionItems: ContentSectionItem[];

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'list-set')) {
      this.id = contentItem.id;
      this.name = contentItem.name;
      this.alias = contentItem.alias;
      this.description = contentItem.content;
      this.contentSectionItems = contentItem.contentSectionItems;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = "list-set";
    output.id = this.id;
    output.name = this.name;
    output.alias = this.alias;
    output.content = this.description;
    output.contentSectionItems = this.contentSectionItems;
    
    return output;
  }
}