import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from 'ngrx-data';
import { Topic } from '../entities/topic';

@Injectable({ providedIn: 'root' })
export class TopicEntityService extends EntityCollectionServiceBase<Topic> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Topic', serviceElementsFactory);
  }
}