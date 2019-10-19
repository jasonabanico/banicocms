import { EntityMetadataMap } from 'ngrx-data';

const entityMetadata: EntityMetadataMap = {
  Subforum: {},
  Topic: {},
  Post: {},
  Comment: {}
};

const pluralNames = {};

export const entityConfig = {
  entityMetadata,
  pluralNames
};