module.exports = {
  env: {
    browser: true,
    es2020: true,
    "jest/globals": true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'jest',
  ],
  rules: {
    semi: [
      'error', 'never',
    ],
    'import/no-extraneous-dependencies': [
      'error', {
        devDependencies: [
          '**/*.test.js*',
        ],
      },
    ],
    'eol-last': 2,
    'jsx-quotes': [
      'error',
      'prefer-single',
    ],
    'no-unused-vars': [
      'error', { argsIgnorePattern: '^_' },
    ],
  },
}
