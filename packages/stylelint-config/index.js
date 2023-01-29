/*
 * @Author: yuqigong@outlook.com
 * @Date: 2023-01-29 17:31:47
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-29 17:43:27
 * @FilePath: /firmiana/packages/stylelint-config/index.js
 * @Description:
 *
 */

// https://stylelint.io/user-guide/get-started
module.exports = {
  extends: [
    // https://github.com/stylelint/stylelint-config-standard
    'stylelint-config-standard',
    // https://github.com/stormwarning/stylelint-config-recess-order
    'stylelint-config-recess-order',
    // https://github.com/prettier/stylelint-prettier
    'stylelint-prettier/recommended',
    // https://github.com/ota-meshi/stylelint-config-html
    'stylelint-config-html',
  ],
  plugins: [
    // https://github.com/hudochenkov/stylelint-order
    'stylelint-order',
  ],
  rules: {
    'no-empty-source': null,
    'unit-no-unknown': null,
    'at-rule-no-unknown': null,
    'value-no-vendor-prefix': null,
    'selector-class-pattern': null,
  },
}
