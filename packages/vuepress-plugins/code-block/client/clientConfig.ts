/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-02-10 16:29:42
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-02-10 17:44:33
 * @FilePath     : /firmiana/packages/vuepress-plugins/code-block/client/clientConfig.ts
 * @Description  :
 *
 */
import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app }) {
    console.log('clientConfig', app)
  },
})
