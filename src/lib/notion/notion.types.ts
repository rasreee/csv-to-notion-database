import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints';

export type DatabasePageProperties = Exclude<CreatePageParameters, { parent: { page_id: string } }>['properties'];

export type NumberProperty = { type: 'number'; number: number };

export type TitleProperty = {
  title: {
    text: {
      content: string;
    };
  }[];
};
