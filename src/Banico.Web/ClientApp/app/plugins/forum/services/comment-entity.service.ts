import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from 'ngrx-data';
import { Comment } from '../entities/comment';

@Injectable({ providedIn: 'root' })
export class CommentEntityService extends EntityCollectionServiceBase<Comment> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Comment', serviceElementsFactory);
  }
}