import { isEmptyString } from './assertion';
import { logger } from './logger';

const SPACE = ' ';
const HYPHEN = '-';
const COLON = ':';

export function trimEachWord(stringWithWords: string): string {
  if (isEmptyString(stringWithWords)) {
    logger.warn(`trimEachWord() called with falsy string: ${stringWithWords}`);
  }
  return stringWithWords.trim().replace(/\s+/g, SPACE);
}

export function capitalize(s: string): string {
  if (isEmptyString(s)) return s;

  const first = s.charAt(0).toUpperCase();
  const rest = s.length > 1 ? s.substring(1) : '';

  return `${first}${rest}`;
}

export function splitBy(s: string, separator: string): string[] {
  return s.split(separator);
}

export function splitIntoWords(s: string): string[] {
  return splitBy(s, SPACE);
}

export function runForEachWord(s: string, fn: (s: string) => string) {
  return splitIntoWords(s).map(fn).join(SPACE);
}

export function capitalizeEachWord(s: string): string {
  return runForEachWord(s, capitalize);
}

const CONJUNCTIONS = ['for', 'and', 'nor', 'but', 'or', 'yet', 'so'];
const ARTICLES = ['a', 'an', 'the'];
const PREPOSITIONS = ['at', 'around', 'by', 'after', 'along', 'for', 'from', 'of', 'on', 'to', 'with', 'without'];

export function capitalizeTitle(s: string): string {
  const words = splitIntoWords(s);

  return words
    .map((word, index) => {
      if (word.includes(HYPHEN)) {
        return word.split(HYPHEN).map(capitalize).join(HYPHEN);
      }

      const lowerCasedWord = word.toLowerCase();

      if (index && !words[index - 1]?.includes(COLON) && [CONJUNCTIONS, ARTICLES, PREPOSITIONS].some(list => list.includes(word))) {
        return lowerCasedWord;
      }

      return capitalize(word);
    })
    .join(SPACE);
}

export function normalizeTitle(initialValue: string): string {
  return capitalizeTitle(trimEachWord(initialValue));
}

export function normalizeName(initialValue: string): string {
  return capitalizeEachWord(trimEachWord(initialValue));
}
