import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from 'ngrx-data';
import { Subforum } from '../entities/subforum';

@Injectable({ providedIn: 'root' })
export class SubforumEntityService extends EntityCollectionServiceBase<Subforum> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Subforum', serviceElementsFactory);
  }
}