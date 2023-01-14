/*
 * @Author: rich1e
 * @Date: 2022-11-11 18:43:42
 * @LastEditors: rich1e
 * @LastEditTime: 2022-11-26 10:30:38
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
