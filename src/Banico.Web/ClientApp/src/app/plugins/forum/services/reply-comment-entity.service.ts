import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from 'ngrx-data';
import { ReplyComment } from '../entities/reply-comment';

@Injectable({ providedIn: 'root' })
export class ReplyCommentEntityService extends EntityCollectionServiceBase<ReplyComment> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('ReplyComment', serviceElementsFactory);
  }
}