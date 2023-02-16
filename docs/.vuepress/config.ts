/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-02-10 16:03:34
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-02-16 13:07:18
 * @FilePath     : /firmiana/docs/.vuepress/config.ts
 * @Description  :
 *
 */
import { defineUserConfig, defaultTheme } from 'vuepress';
import { viteBundler } from '@vuepress/bundler-vite';
import * as sidebar from './configs/sidebar';

import { codeBlockPlugin } from '@firmiana/vuepress-plugins';

export default defineUserConfig({
  // base: '/firmiana/',

  pagePatterns: [
    '**/*.md',
    '!.vuepress',
    '!node_modules',
    // 查找组件的文件
    '../packages/form-plux/**/*.md',
    '!../packages/**/node_modules',
  ],

  port: 3388,
  open: true,

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'firmiana',
      description: 'Vue3 组件库开发模板 & Vue3 组件库实践指南',
    },
  },

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  theme: defaultTheme({
    locales: {
      '/': {
        navbar: [],
        sidebar: sidebar.zh,
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
      },
    },
  }),

  plugins: [codeBlockPlugin()],
});
