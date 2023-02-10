/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-02-02 17:41:13
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-02-10 17:16:38
 * @FilePath     : /firmiana/packages/eslint-config/src/typescript.js
 * @Description  :
 *
 */
module.exports = {
  extends: [
    // https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    './basic',
  ],
  rules: {
    // override rules
    'no-useless-constructor': 'off',
    'no-unused-vars': 'off',
    'no-redeclare': 'off',
    'no-use-before-define': 'off',

    // off rules
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
}
