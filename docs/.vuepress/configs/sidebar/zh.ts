/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-02-02 09:36:51
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-02-16 11:07:17
 * @FilePath     : /firmiana/docs/.vuepress/configs/sidebar/zh.ts
 * @Description  :
 *
 */
import type { SidebarConfig } from 'vuepress';

export const zh: SidebarConfig = {
  '/components': [
    {
      text: '基础组件',
      children: [
        {
          text: 'Button 按钮',
          link: '/components/button/',
        },
      ],
    },
  ],
};
