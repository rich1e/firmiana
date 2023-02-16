/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-02-10 16:32:04
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-02-16 11:17:17
 * @FilePath     : /firmiana/packages/vuepress-plugins/code-block/index.ts
 * @Description  :
 *
 */
import { path } from '@vuepress/utils';
import type { Plugin } from '@vuepress/core';
import { resolveHtmlBlock, resolveScriptSetup, vitePageHMR } from './node';

export const codeBlockPlugin = (): Plugin => {
  const store = new Map<string, Map<string, string>>();

  return {
    name: '@firmiana/vuepress-plugin-code-block',

    clientConfigFile: path.resolve(__dirname, './client/clientConfig.ts'),

    extendsMarkdown(md) {
      resolveHtmlBlock(md, store);
    },

    async extendsPage(page) {
      resolveScriptSetup(page, store);
    },

    extendsBundlerOptions(bundlerOptions, app) {
      if (app.options.bundler.name === '@vuepress/bundler-vite') {
        bundlerOptions.viteOptions ??= {};
        bundlerOptions.viteOptions.plugins ??= [];
        bundlerOptions.viteOptions.plugins.push(vitePageHMR(app));
      }
    },
  };
};
