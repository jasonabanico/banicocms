import { EntityMetadataMap } from 'ngrx-data';

const entityMetadata: EntityMetadataMap = {
  Subforum: {},
  Topic: {},
  Reply: {},
  ReplyComment: {}
};

const pluralNames = { Reply: 'Replies' };

export const entityConfig = {
  entityMetadata,
  pluralNames
};