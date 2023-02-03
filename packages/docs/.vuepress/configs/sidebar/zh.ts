/*
 * @Author: yuqigong@outlook.com
 * @Date: 2023-01-30 17:42:57
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-02-03 18:46:15
 * @FilePath: /firmiana/packages/docs/.vuepress/configs/sidebar/zh.ts
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
          // link: '../CHANGELOG.md',
          link: '../../../CHANGELOG.md',
          // link: '../README.md',
          // link: './form-plux/components/button/README.md',
          // link: '/../packages/form-plux/components/button/README.md',
        },
      ],
    },
  ],
}
