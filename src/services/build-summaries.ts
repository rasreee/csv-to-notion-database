import { getAverageRating, getFavoritesCount, RatingSummaryObject } from 'domains/book';

import { GroupedRatings } from './group-ratings';

type RatingSummaryHandler = (entry: RatingSummaryObject) => any;

export const buildSummaries = <Handler extends RatingSummaryHandler>(
  groupedRatings: GroupedRatings,
  onEntry: Handler,
): ReturnType<Handler>[] => {
  const summaries: ReturnType<Handler>[] = [];
  for (const [title, ratings] of groupedRatings.entries()) {
    const ratingValues = ratings.map(data => data.rating);
    const summary = { title, averageRating: getAverageRating(ratingValues), favoritesCount: getFavoritesCount(ratingValues) };

    summaries.push(onEntry(summary));
  }
  return summaries;
};
