module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:compat/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  globals: {
    BufferEncoding: 'readonly',
    NodeJS: 'readonly'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    semi: ['error', 'always'],
    'no-use-before-define': 'off',
    'compat/compat': 'off',
    'n/no-callback-literal': 'off',
    'no-dupe-class-members': 'off',
    'max-len': ['error', { code: 120 }],
    'arrow-parens': 'off',
    'arrow-body-style': 'off',
    'object-curly-newline': 'off',
    'no-mixed-operators': 'off',
    'function-paren-newline': 'off',
    'no-plusplus': 'off',
    'prefer-arrow-callback': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/space-before-function-paren': 'off'
  }
};
