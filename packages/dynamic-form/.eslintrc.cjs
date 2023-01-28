/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-03 16:46:53
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-30 11:27:46
 * @FilePath: /vue-form/.eslintrc.cjs
 * @Description:
 */
// https://typescript-eslint.io/docs/linting/typed-linting/monorepos

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'standard-with-typescript',
    // https://juejin.cn/post/7012160233061482532
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  // https://eslint.vuejs.org/user-guide/#usage
  // https://github.com/vuejs/eslint-plugin-vue/issues/746
  parser: 'vue-eslint-parser',
  overrides: [],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    // https://stackoverflow.com/questions/71080256/is-there-a-way-to-automatically-fix-import-type-errors-on-typescript-when-usin
    '@typescript-eslint/consistent-type-imports': 'error',
  },
};
