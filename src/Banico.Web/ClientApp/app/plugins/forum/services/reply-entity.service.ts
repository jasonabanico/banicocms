import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from 'ngrx-data';
import { Reply } from '../entities/reply';

@Injectable({ providedIn: 'root' })
export class ReplyEntityService extends EntityCollectionServiceBase<Reply> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Reply', serviceElementsFactory);
  }
}