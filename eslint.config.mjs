import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactNativePlugin from 'eslint-plugin-react-native';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      'ios/**',
      'android/**',
      'build/**',
      'vendor/**',
      '.git/**',
      '*.config.js',
      'babel.config.js',
      'metro.config.js',
    ],
  },

  // TypeScript and React files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-native': reactNativePlugin,
      import: importPlugin,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/internal-regex': '^@(?:api|components|hooks|navigation|screens|stores|theme|types|utils)(/|$)',
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      // TypeScript recommended rules
      ...tseslint.configs.recommended.rules,

      // React recommended rules
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      // Disable prop-types for TypeScript files (TypeScript handles type checking)
      'react/prop-types': 'off',

      // React Hooks rules
      ...reactHooksPlugin.configs.recommended.rules,

      // React Native rules
      ...reactNativePlugin.configs.all.rules,

      // Import rules
      ...importPlugin.configs.recommended.rules,
      // Allow require() for static assets while keeping other CommonJS imports blocked
      '@typescript-eslint/no-require-imports': [
        'error',
        {
          allow: ['\\.(png|jpg|jpeg|gif|svg|webp)$'],
        },
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // Prettier integration
      'prettier/prettier': 'error',

      // Disable conflicting rules (prettier config)
      ...prettierConfig.rules,
    },
  },

  // Override for JS/TS/TSX files (excluding JSX) - uses simple-import-sort
  {
    files: ['**/*.{js,ts,tsx}'],
    rules: {
      // Disable import/order for files using simple-import-sort
      'import/order': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^(components|hooks|navigation|screens|stores|theme|types|utils)(/.*|$)'],
            [
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$',
            ],
          ],
        },
      ],
    },
  },
];
