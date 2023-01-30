/*
 * @Author: rich1e
 * @Date: 2022-11-11 18:43:42
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-30 15:32:14
 */
/// <reference types="vite/client" />

declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}
