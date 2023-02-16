/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-02-02 09:36:51
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-02-16 14:14:05
 * @FilePath     : /firmiana/.eslintrc.js
 * @Description  :
 *
 */
module.exports = {
  root: true,
  extends: '@firmiana/eslint-config',
  /**
   * @see https://blog.csdn.net/Leaf_Yi/article/details/121410795
   */
  parserOptions: {
    tsconfigRootDir: __dirname,
    // project: true,
    // project: null,
    project: ['./**/tsconfig.json'],
    // project: ['./tsconfig.json', './packages/form-plux/tsconfig.json'],
    extraFileExtensions: ['.vue'],
  },
};
