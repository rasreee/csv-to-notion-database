import { calculateAverage, countHowManyEqual } from 'lib/math';
import { numberProperty, titleProperty } from 'lib/notion';
import { normalizeName, normalizeTitle } from 'lib/string';

import { BookProperties, BookProperty, Rating, RatingData, RatingRow, RatingSummary, RatingSummaryObject } from './book.types';

export const toRatingSummaryObject = (summary: RatingSummary): RatingSummaryObject => {
  if (Array.isArray(summary)) {
    const [title, averageRating, favoritesCount] = summary;

    return { title, averageRating, favoritesCount };
  }

  return summary;
};

export function makeBookProperties(summary: RatingSummary): BookProperties {
  const { title, averageRating, favoritesCount } = toRatingSummaryObject(summary);

  return {
    [BookProperty.Title]: titleProperty(title),
    [BookProperty.AverageRating]: numberProperty(averageRating),
    [BookProperty.Favorites]: numberProperty(favoritesCount),
  };
}

export function normalizeRatingRow(row: RatingRow): RatingRow {
  const [book, member, rating] = row;

  return [normalizeTitle(book), normalizeName(member), parseFloat(rating).toFixed(1)];
}

export function parseRatingCSVRow(row: RatingRow): Rating {
  const [book, member, rating] = row;

  return { book, member, rating: parseFloat(rating) };
}

export const MAX_RATING = 5;

export const toRatingData = ({ member, rating }: { member: string; rating: string | number }): RatingData => {
  return { member, rating: typeof rating === 'string' ? parseFloat(rating) : rating };
};

export const getFavoritesCount = (ratings: number[]): number => countHowManyEqual(ratings, 5);

export const getAverageRating = (ratings: number[]): number => {
  return calculateAverage(ratings, 1);
};
