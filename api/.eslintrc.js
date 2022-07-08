module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 'off',
    'space-before-blocks': 'off',
    'class-methods-use-this': 'off',
    'import/no-unresolved': 'off',
    'no-console': 'off',
    'no-promise-executor-return': 'off',
    'consistent-return': 'off',
    'no-shadow': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
