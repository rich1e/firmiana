/*
 * @Author: your name
 * @Date: 2021-06-03 17:00:16
 * @LastEditTime: 2022-11-11 16:13:01
 * @LastEditors: gongyuqi@max-optics.com
 * @Description: In User Settings Edit
 * @FilePath: /vue-form/src/shims-vue.d.ts
 */
// declare module '*.vue' {
//   import { DefineComponent } from 'vue'
//   // const component: DefineComponent<{}, {}, any>
//   const component: ReturnType<typeof DefineComponent>;
//   export default component
// }

declare type EmitType<T> = (event: T, ...args: any[]) => void;
