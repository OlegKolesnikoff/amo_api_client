// eslint-disable-next-line n/no-unpublished-require
const globals = require('globals');
// eslint-disable-next-line n/no-unpublished-require
const js = require('@eslint/js');
// eslint-disable-next-line n/no-unpublished-require
const nodePlugin = require("eslint-plugin-n");

module.exports = [
  js.configs.recommended,
  nodePlugin.configs["flat/recommended-script"],
  {
    files: ['**/*.js'],
  },

  {
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
  },

  {
    ignores: ['slider/', 'placement/', 'test.js'],
  },
  {
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
      'require-atomic-updates': 'error',
      'arrow-body-style': ['warn', 'as-needed'],
      'block-scoped-var': 'error',
      curly: ['error', 'multi-line'],
      'func-name-matching': 'error',
      'logical-assignment-operators': ['error', 'always', { enforceForIfStatements: true }],
      'max-depth': ['warn', 5],
      'max-lines': ['warn', { max: 1000 }],
      'max-lines-per-function': ['warn', 120],
      'max-params': ['warn', 9],
      'no-console': 'error',
      'no-eq-null': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-label': 'error',
      'no-invalid-this': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-loop-func': 'error',
      'no-multi-assign': 'error',
      'no-multi-str': 'warn',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'no-useless-catch': 'error',
      'no-useless-concat': 'error',
      'object-shorthand': 'error',
      'operator-assignment': ['error', 'always'],
      'prefer-const': 'warn',
      'prefer-object-has-own': 'error',
      yoda: 'warn',
      "n/prefer-global/buffer": ["error", "always"]
    },
  },
];