import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  {
    ...pluginJs.configs.recommended,
    'rules': {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { 'after': true }],
      'object-curly-spacing': ['error', 'always'],
      'eol-last': ['error', 'always'],
      'no-multi-spaces': 'error',
      'max-lines': ['error', 150],
      'no-multiple-empty-lines': ['error', { 'max': 1 }],
      'eqeqeq': 'error',
      'max-len': ['error', 120],
    },
  },
];
