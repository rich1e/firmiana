/*
 * @Author: yuqigong@outlook.com
 * @Date: 2023-01-29 17:16:18
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-29 17:16:22
 * @FilePath: /firmiana/packages/eslint-config/src/vue.js
 * @Description:
 *
 */

// https://eslint.vuejs.org/user-guide
module.exports = {
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  extends: [
    // https://eslint.vuejs.org/user-guide/#bundle-configurations
    'plugin:vue/vue3-recommended',
    './typescript',
  ],
  rules: {
    // off rules
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
  },
}
