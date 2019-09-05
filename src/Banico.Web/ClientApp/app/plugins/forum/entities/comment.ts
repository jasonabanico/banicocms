import { ContentItem } from "../../../entities/content-item";
import * as moment from 'moment';

export class Comment {
  id: string;
  text: string;
  postId: string;
  userId: string;
  username: string;
  avatarHash: string;
  createdDate: string;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'forum-comment')) {
      this.id = contentItem.id;
      this.text = contentItem.content;
      this.postId = contentItem.parentId;
      this.userId = contentItem.createdBy;
      this.createdDate = contentItem.createdDate;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = 'forum-comment';
    output.id = this.id;
    output.content = this.text;
    output.parentId = this.postId;
    
    return output;
  }

  public moment(): string {
    return moment(this.createdDate).format('MMMM Do YYYY, h:mm:ss a');
  }

  public momentRelative(): string {
    return moment(this.createdDate).fromNow();
  }
}