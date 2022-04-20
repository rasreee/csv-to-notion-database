import { RatingData, RatingRow, toRatingData } from 'domains/book';
import { parseCSVStream } from 'lib/file-system';

export class GroupedRatings extends Map<string, RatingData[]> {}

export const groupRatingsByBook = async (inputFile: string) => {
  const result = new GroupedRatings();

  return new Promise<GroupedRatings>((resolve, reject) => {
    parseCSVStream<RatingRow>(inputFile, {
      onRow: ([book, member, rating]: RatingRow) => {
        const existingRatings = result.get(book) ?? [];
        result.set(book, [...existingRatings, toRatingData({ member, rating })]);
      },
      onComplete: () => {
        resolve(result);
      },
      onError: error => {
        console.error('parseCSVStream error: ', error);
        reject(error);
      },
    });
  });
};
