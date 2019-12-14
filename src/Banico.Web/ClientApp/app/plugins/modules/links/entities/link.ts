import { ContentItem } from "../../../../entities/content-item";

export class Link {
  id: string;
  name: string;
  sectionItems: string;
  description: string;
  url: string;

  constructor(private contentItem: ContentItem) {
    if (contentItem && contentItem.module === "link") {
      this.id = contentItem.id;
      this.name = contentItem.name;
      this.sectionItems = contentItem.sectionItems;
      this.description = contentItem.content;
      this.url = contentItem.attribute01;
    }
  }

  public toContentItem(): ContentItem {
    const output: ContentItem = new ContentItem();

    output.module = "link";
    output.id = this.id;
    output.name = this.name;
    output.sectionItems = this.sectionItems;
    output.content = this.description;
    output.attribute01 = this.url;

    return output;
  }
}
