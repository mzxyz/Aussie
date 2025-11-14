const path = require('path');

const fromRoot = relativePath => `<rootDir>/${relativePath}`;

/** @type {import('jest').Config} */
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '^components/(.*)$': fromRoot('src/components/$1'),
    '^navigation/(.*)$': fromRoot('src/navigation/$1'),
    '^screens/(.*)$': fromRoot('src/screens/$1'),
    '^utils/(.*)$': fromRoot('src/utils/$1'),
    '^types/(.*)$': fromRoot('src/types/$1'),
    '^hooks/(.*)$': fromRoot('src/hooks/$1'),
    '^stores/(.*)$': fromRoot('src/stores/$1'),
    '^theme/(.*)$': fromRoot('src/theme/$1'),
    '^api/(.*)$': fromRoot('src/api/$1'),
    '\\.(gif|jpg|jpeg|png|svg|ttf|otf)$': fromRoot('jest/fileMock.js'),
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|@react-native-vector-icons' +
      ')/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
};
