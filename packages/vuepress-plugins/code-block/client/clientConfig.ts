/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-02-16 11:10:32
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-02-16 11:10:50
 * @FilePath     : /firmiana/packages/vuepress-plugins/code-block/client/clientConfig.ts
 * @Description  :
 *
 */
import { defineClientConfig } from '@vuepress/client';
import Demo from './components/demo.vue';
import './styles/index.scss';

export default defineClientConfig({
  enhance({ app }) {
    app.component('CodeDemo', Demo);
  },
});
