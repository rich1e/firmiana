/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-02-10 16:32:04
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-02-10 17:41:56
 * @FilePath     : /firmiana/packages/vuepress-plugins/code-block/index.ts
 * @Description  :
 *
 */
import { path } from '@vuepress/utils'
import type { Plugin } from '@vuepress/core'

export const codeBlockPlugin = (): Plugin => {
  return {
    name: '@firmiana/vuepress-plugin-code-block',

    clientConfigFile: path.resolve(__dirname, './client/clientConfig.ts'),
  }
}
