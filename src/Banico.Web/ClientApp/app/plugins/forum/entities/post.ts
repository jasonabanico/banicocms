import { ContentItem } from "../../../entities/content-item";
import * as moment from 'moment';

export class Post {
  id: string;
  text: string;
  topicId: string;
  userId: string;
  username: string;
  avatarHash: string;
  createdDate: string;
  commentCount: number;

  constructor(private contentItem: ContentItem) {
    if ((contentItem) && (contentItem.module == 'forum-post')) {
      this.id = contentItem.id;
      this.text = contentItem.content;
      this.topicId = contentItem.parentId;
      this.userId = contentItem.createdBy;
      this.createdDate = contentItem.createdDate;
      this.commentCount = contentItem.childCount;
    }
  }

  public ToContentItem(): ContentItem {
    let output: ContentItem = new ContentItem();

    output.module = 'forum-post';
    output.id = this.id;
    output.content = this.text;
    output.parentId = this.topicId;
    
    return output;
  }

  public moment(): string {
    return moment(this.createdDate).format('MMMM Do YYYY, h:mm:ss a');
  }

  public momentRelative(): string {
    return moment(this.createdDate).fromNow();
  }
}