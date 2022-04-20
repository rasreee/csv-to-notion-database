import { Client } from '@notionhq/client';
import { __VERBOSE__ } from 'lib/assertion';
import { logger } from 'lib/logger';
import { DatabasePageProperties, makeDatabaseQuery, PropertyFilter } from 'lib/notion';

export class Database {
  constructor(private readonly id: string, private readonly client: Client) {}

  queryDatabasePages = async (id: string, propertyFilter: PropertyFilter) => {
    const { results } = await this.client.databases.query(makeDatabaseQuery(id, propertyFilter));

    const pageIds = results.filter(result => result.object === 'page').map(result => result.id);

    return pageIds;
  };

  maybeGetDatabasePage = async ({ propertyFilter }: { propertyFilter: PropertyFilter }) => {
    const pageIds = await this.queryDatabasePages(this.id, propertyFilter);

    return pageIds[0] ?? null;
  };

  addPage = async ({ properties }: { properties: DatabasePageProperties }) => {
    __VERBOSE__ && logger.fn('addPage', { databaseId: this.id, properties });
    try {
      await this.client.pages.create({
        parent: { database_id: this.id },
        properties,
      });
    } catch (err) {
      logger.fnError('addPage', { databaseId: this.id, properties }, err);
      throw err;
    }
  };

  updatePage = async ({ pageId, properties }: { pageId: string; properties: DatabasePageProperties }) => {
    __VERBOSE__ && logger.fn('updatePage', { pageId, properties });

    try {
      await this.client.pages.update({
        page_id: pageId,
        properties,
      });
    } catch (err) {
      logger.fnError('updatePage', { pageId, properties }, err);
      process.exit(1);
    }
  };

  setPage = async ({ pageId, properties }: { pageId: string | undefined; properties: DatabasePageProperties }) => {
    if (!pageId) {
      await this.addPage({ properties });
    } else {
      await this.updatePage({ pageId, properties });
    }
  };
}
