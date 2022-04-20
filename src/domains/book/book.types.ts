import { NumberProperty, TitleProperty } from 'lib/notion';

/**
 * Book rating given by a member
 */
export interface Rating {
  // Name of the book
  book: string;
  // Name of the member
  member: string;
  // Rating given from 0 to 5
  rating: number;
}

export enum BookProperty {
  Title = 'Title',
  AverageRating = 'Average Rating',
  Favorites = 'Favorites',
}

export type RatingSummaryObject = { title: string; averageRating: number; favoritesCount: number };
export type RatingSummaryTuple = [title: string, averageRating: number, favoritesCount: number];

export type RatingSummary = RatingSummaryTuple | RatingSummaryObject;

export type RatingRow = [string, string, string];

export interface BookNdjson {
  book: string;
  ratings: [string, number][];
}

export type BookProperties = {
  [BookProperty.Title]: TitleProperty;
  [BookProperty.AverageRating]: NumberProperty;
  [BookProperty.Favorites]: NumberProperty;
};

export type RatingData = {
  member: string;
  rating: number;
};
