import { ContentItem } from "../../../entities/contentitem";

export class List {
  id: string;
  name: string;
  description: string;
  listItems: string;
  sectionItems: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'list')) {
      this.id = contentItem.id;
      this.name = contentItem.name;
      this.description = contentItem.content;
      this.listItems = contentItem.attribute01;
      this.sectionItems = contentItem.sectionItems;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = "list";
    output.id = this.id;
    output.name = this.name;
    output.content = this.description;
    output.attribute01 = this.listItems;
    output.sectionItems = this.sectionItems;
    
    return output;
  }
}