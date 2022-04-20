import { BookProperty, makeBookProperties, RatingSummary, toRatingSummaryObject } from 'domains/book';
import { Database, makeEqualsFilter } from 'lib/notion';

export const saveSummary = async (database: Database, summary: RatingSummary) => {
  const properties = makeBookProperties(summary);

  const propertyFilter = makeEqualsFilter(BookProperty.Title, 'title', toRatingSummaryObject(summary).title);
  const pageId = await database.maybeGetDatabasePage({ propertyFilter });

  await database.setPage({ pageId, properties });
};
