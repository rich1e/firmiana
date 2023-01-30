/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-12-09 16:57:04
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-30 16:57:44
 * @FilePath: /firmiana/packages/form-plux/components/index.ts
 * @Description:
 *
 */
/**
 * @see https://github.com/bfehub/vlib-starter/blob/3-ui/packages/vlib-ui/src/index.ts
 * @see https://juejin.cn/post/7137107018938056734#heading-1
 */

import type { App } from 'vue'
import { Button } from './button'

export * from './button'

const components = [Button]

function install(app: App) {
  components.forEach((item) => {
    if (item.install!) {
      app.use(item)
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}

export default {
  install,
  components,
}
