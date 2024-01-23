module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['.eslintrc.js', 'jest.config.js', 'test/*'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unknown-property': 'off',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-trailing-spaces': ['error']
  }
};
