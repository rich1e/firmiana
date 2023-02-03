/*
 * @Author: yuqigong@outlook.com
 * @Date: 2023-01-30 17:31:21
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-02-03 18:41:53
 * @FilePath: /firmiana/packages/docs/.vuepress/config.ts
 * @Description:
 *
 */
import { defineUserConfig, defaultTheme } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import * as sidebar from './configs/sidebar'
import path from 'path'

console.log('aaaaaaaa', sidebar.zh['/components'][0])

export default defineUserConfig({
  base: '/firmiana/',

  pagePatterns: [
    '**/*.md',
    '!.vuepress',
    '!node_modules',
    // 查找组件的文件
    // '../../packages/form-plux/**/*.md',
    '!../packages/**/node_modules',
  ],

  port: 3388,
  open: true,

  alias: {
    '@form-plux': path.resolve(__dirname, '../../form-plux'),
  },

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
})
