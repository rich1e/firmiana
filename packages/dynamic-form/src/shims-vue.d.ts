/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2021-06-03 17:00:16
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-03-01 11:04:43
 * @FilePath     : /firmiana/packages/dynamic-form/src/shims-vue.d.ts
 * @Description  :
 *
 */
// declare module '*.vue' {
//   import { DefineComponent } from 'vue'
//   // const component: DefineComponent<{}, {}, any>
//   const component: ReturnType<typeof DefineComponent>;
//   export default component
// }

declare type EmitType<T> = (event: T, ...args: any[]) => void;
