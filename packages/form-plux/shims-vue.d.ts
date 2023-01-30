/*
 * @Author: yuqigong@outlook.com
 * @Date: 2021-06-03 17:00:16
 * @LastEditTime: 2023-01-30 16:06:07
 * @LastEditors: yuqigong@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /firmiana/packages/form-plux/shims-vue.d.ts
 */
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // const component: DefineComponent<{}, {}, any>
  const component: ReturnType<typeof DefineComponent>
  export default component
}

declare type EmitType<T> = (event: T, ...args: any[]) => void

declare module '@element-plus/utils'
