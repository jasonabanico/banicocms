import { ContentItem } from "../../../../entities/content-item";

export class Subforum {
  id: string;
  name: string;
  alias: string;
  description: string;
  snippet: string;
  sectionItems: string;
  userId: string;
  username: string;
  avatarHash: string;
  createdDate: string;
  topicCount: number;

  constructor(private contentItem: ContentItem) {
    if (contentItem && contentItem.module == "forum-subforum") {
      this.id = contentItem.id;
      this.name = contentItem.name;
      this.alias = contentItem.alias;
      this.description = contentItem.content;
      this.snippet = contentItem.snippet;
      this.sectionItems = contentItem.sectionItems;
      this.userId = contentItem.createdBy;
      this.createdDate = contentItem.createdDate;
      this.topicCount = contentItem.childCount;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = "forum-subforum";
    output.id = this.id;
    output.name = this.name;
    output.alias = this.alias;
    output.content = this.description;
    output.sectionItems = this.sectionItems;

    return output;
  }
}
