import { Database } from 'lib/notion';

import { buildSummaries } from './build-summaries';
import { GroupedRatings } from './group-ratings';
import { saveSummary } from './save-summary';

export const buildAndSaveSummaries = async (groupedRatings: GroupedRatings, database: Database) => {
  await Promise.all(buildSummaries(groupedRatings, summary => saveSummary(database, summary)));
};
