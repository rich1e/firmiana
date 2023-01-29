/*
 * @Author: yuqigong@outlook.com
 * @Date: 2023-01-29 17:50:15
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-29 17:50:26
 * @FilePath: /firmiana/.lintstagedrc.js
 * @Description:
 *
 */

module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{css,scss,less,styl}': ['stylelint --fix', 'prettier --write'],
  '*.vue': ['eslint --fix', 'stylelint --fix', 'prettier --write'],
  'package.json': ['prettier --write'],
}
