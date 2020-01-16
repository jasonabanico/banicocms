import { ContentItem } from "../../../../entities/content-item";

export class Page {
  id: string;
  owners: string;
  ownerUserIds: string;
  title: string;
  content: string;
  createdDate: string;
  updatedDate: string;
  alias: string;

  constructor(private contentItem: ContentItem) {
    if (contentItem && contentItem.module === "page") {
      this.id = contentItem.id;
      this.owners = contentItem.owners;
      this.ownerUserIds = contentItem.ownerUserIds;
      this.title = contentItem.name;
      this.content = contentItem.content;
      this.createdDate = contentItem.createdDate;
      this.updatedDate = contentItem.updatedDate;
      this.alias = contentItem.alias;
    }
  }

  public toContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = "page";
    output.id = this.id;
    output.name = this.title;
    output.content = this.content;
    output.alias = this.alias;

    return output;
  }
}
