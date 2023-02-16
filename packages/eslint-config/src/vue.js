/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-02-02 09:36:51
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-02-16 14:10:38
 * @FilePath     : /firmiana/packages/eslint-config/src/vue.js
 * @Description  :
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
    'standard-with-typescript',
    // https://juejin.cn/post/7012160233061482532
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    './typescript',
  ],
  rules: {
    // off rules
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/require-valid-default-prop': 'off',
    'vue/no-setup-props-destructure': 'off',
  },
};
