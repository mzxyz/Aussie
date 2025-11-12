module.exports = {
  root: true,
  env: {
    'react-native/react-native': true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-native',
    'react-hooks',
    'import',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier', // Always last
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    // Imports
    'import/order': [
      'warn',
      {
        groups: [
          '@screens',
          '@components',
          '@utils',
          '@types',
          '@hooks',
          '@stores',
          '@api',
        ],
        'newlines-between': 'always',
      },
    ],
  },
};
