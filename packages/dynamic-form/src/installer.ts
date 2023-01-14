/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-12-05 14:49:22
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-05 15:51:52
 * @FilePath: /vue-form/src/installer.ts
 * @Description:
 *
 */
import type { App } from 'vue';

export function withInstall(component: any) {
  component.install = (app: App) => {
    const { name } = component;
    app.component(name, component);
  };

  return component;
}
