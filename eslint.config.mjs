import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactNativePlugin from 'eslint-plugin-react-native';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

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
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
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
      // Allow require() for image files (React Native standard)
      'import/no-require': [
        'error',
        {
          allow: ['\\.(png|jpg|jpeg|gif|svg|webp)$'],
        },
      ],

      // Prettier integration
      'prettier/prettier': 'error',

      // Disable conflicting rules (prettier config)
      ...prettierConfig.rules,
    },
  },
];
