import { normalizeRatingRow } from 'domains/book';
import { transformAndOutputCSV } from 'lib/file-system';

export async function normalizeRatings(inputFile: any, outputFile: string): Promise<void> {
  await transformAndOutputCSV(inputFile, outputFile, normalizeRatingRow);
}
