import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

import { PropertyFilter } from './api-endpoints';
import { NumberProperty, TitleProperty } from './notion.types';

export function numberProperty(value: number): NumberProperty {
  return {
    type: 'number',
    number: value,
  };
}

export function titleProperty(title: string): TitleProperty {
  return {
    title: [{ text: { content: title } }],
  };
}

export const PropertyTypes = {
  Title: 'title',
  RichText: 'rich_text',
  Number: 'number',
  Checkbox: 'checkbox',
  Selet: 'select',
  MultiSelect: 'multi_select',
  Date: 'date',
  People: 'people',
  Files: 'files',
  Url: 'url',
  Email: 'email',
  PhoneNumber: 'phone_number',
  Relation: 'relation',
  CreatedBy: 'created_by',
  CreatedTime: 'created_time',
  LastEditedBy: 'last_edited_by',
  LastEditedTime: 'last_edited_time',
  Formula: 'formula',
  Rollup: 'rollup',
} as const;

export type PropertyType = typeof PropertyTypes[keyof typeof PropertyTypes];

export const makeEqualsFilter = <P extends PropertyType>(propertyName: string, propertyType: P, equals: string): PropertyFilter =>
  ({
    property: propertyName,
    [propertyType]: { equals },
  } as PropertyFilter);

export const makeDatabaseQuery = (id: string, filter: PropertyFilter): QueryDatabaseParameters => ({
  database_id: id,
  filter,
});
