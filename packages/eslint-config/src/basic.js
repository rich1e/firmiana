/*
 * @Author: yuqigong@outlook.com
 * @Date: 2023-01-29 16:51:12
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-29 17:06:33
 * @FilePath: /firmiana/packages/eslint-config/src/basic.js
 * @Description:
 *
 */

module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    // https://github.com/standard/eslint-config-standard
    'standard',
    // https://github.com/prettier/eslint-plugin-prettier
    'plugin:prettier/recommended',
  ],
}
