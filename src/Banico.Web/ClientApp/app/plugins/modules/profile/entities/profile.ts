import { ContentItem } from "../../../../entities/content-item";

export class Profile {
  id: string;
  alias: string;
  content: string;
  htmlContent: string;
  createdDate: string;
  updatedDate: string;

  constructor(private contentItem: ContentItem) {
    if (contentItem && contentItem.module == "profile") {
      this.id = contentItem.id;
      this.alias = contentItem.alias;
      this.content = contentItem.content;
      this.htmlContent = contentItem.htmlContent;
      this.createdDate = contentItem.createdDate;
      this.updatedDate = contentItem.updatedDate;
    }
  }

  public toContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = "forum-topic";
    output.id = this.id;
    output.alias = this.alias;
    output.content = this.content;

    return output;
  }
}
