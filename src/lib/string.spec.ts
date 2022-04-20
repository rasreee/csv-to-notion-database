import { capitalizeTitle, normalizeName, normalizeTitle, trimEachWord } from 'lib/string';

const capitalizeTitleFixtures = {
  lowerCasedWordInMiddle: { initial: 'The whole Earth Catalog', expected: 'The Whole Earth Catalog' },
  lowerCasedWordAtRightAfterHyphenAndColon: {
    initial: 'design Patterns: elements of Reusable Object-oriented Software',
    expected: 'Design Patterns: Elements of Reusable Object-Oriented Software',
  },
};

const normalizeTitleFixtures = {
  lowerCasedWordInMiddle: { initial: 'The whole Earth Catalog', expected: 'The Whole Earth Catalog' },
  lowerCasedAndTrailingSpace: { initial: 'innovators ', expected: 'Innovators' },
  lowerCasedWordRightAfterColonAndTrailingSpace: {
    initial: 'Conscious Business: how to Build Value Through Values ',
    expected: 'Conscious Business: How to Build Value Through Values',
  },
  lowerCasedWordAtRightAfterHyphenAndColon: {
    initial: 'design Patterns: elements of Reusable Object-oriented Software',
    expected: 'Design Patterns: Elements of Reusable Object-Oriented Software',
  },
};

/**
 * @group lib
 * @group string
 * @group unit
 */
describe('lib/string', () => {
  describe('trimEachWord()', () => {
    it('title with more than one space between each word', () => {
      expect(trimEachWord(' foo   Bar ')).toEqual('foo Bar');
    });
  });

  describe('capitalizeTitle()', () => {
    const cases = Object.values(capitalizeTitleFixtures).map(value => [value.initial, value.expected]);
    it.each(cases)(`%s - %s`, (initial, expected) => {
      expect(capitalizeTitle(initial)).toEqual(expected);
    });
  });

  describe('normalizeTitle()', () => {
    it.each(Object.values(normalizeTitleFixtures).map(value => [value.initial, value.expected]))(`%s - %s`, (initial, expected) => {
      expect(normalizeTitle(initial)).toEqual(expected);
    });
  });

  describe('normalizeName()', () => {
    it('name with more than one space between each word', () => {
      expect(normalizeName(' billy   b')).toEqual('Billy B');
    });
  });
});
