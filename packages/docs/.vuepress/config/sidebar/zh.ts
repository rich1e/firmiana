/*
 * @Author: yuqigong@outlook.com
 * @Date: 2023-01-30 17:42:57
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-30 17:43:28
 * @FilePath: /firmiana/packages/docs/.vuepress/config/sidebar/zh.ts
 * @Description:
 *
 */
import type { SidebarConfig } from 'vuepress'

export const zh: SidebarConfig = {
  '/components': [
    {
      text: '基础组件',
      children: [
        {
          text: 'Button 按钮',
          link: '/../packages/form-plux/src/button/README.md',
        },
      ],
    },
  ],
}
