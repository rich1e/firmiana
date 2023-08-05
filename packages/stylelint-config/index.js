/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-08-05 18:58:31
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-08-05 19:32:46
 */
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
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'no-empty-source': null,
    'unit-no-unknown': null,
    'value-no-vendor-prefix': null,
    'selector-class-pattern': null,
    'annotation-no-unknown': [
      true,
      {
        ignoreAnnotations: ['default', 'global'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'use',
          'function',
          'return',
          'at-root',
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin',
          'extend',
        ],
      },
    ],
  },
};
