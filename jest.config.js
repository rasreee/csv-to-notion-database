/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  modulePathIgnorePatterns: ['build/'],
  runner: 'groups',
  moduleNameMapper: {
    '^lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  setupFilesAfterEnv: [],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  watchPlugins: [
    [
      'jest-watch-typeahead/filename',
      {
        key: 'k',
        prompt: 'do something with my custom prompt',
      },
    ],
    'jest-watch-typeahead/testname',
  ],
};
