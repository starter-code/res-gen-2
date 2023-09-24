module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  ignorePatterns: ['package.json', 'package-lock.json'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
  },
};
