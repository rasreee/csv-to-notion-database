import { getOrCreateLocation } from 'lib/file-system';

export const OUT_DIRECTORY = getOrCreateLocation(__dirname, '../../static/out')('directory');
export const NORMALIZED_RATINGS_FILE = getOrCreateLocation(OUT_DIRECTORY, 'ratings-normalized.csv')('file');
