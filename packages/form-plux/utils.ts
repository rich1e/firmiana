/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-12-09 16:59:54
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-09 17:24:13
 * @FilePath: /firmiana/packages/form-plux/utils.ts
 * @Description:
 *
 */
import type { AppContext, Plugin, App } from 'vue'

/**
 * @see https://www.linsizao.site/%E5%B0%81%E8%A3%85vue3%E6%8F%92%E4%BB%B6install%E6%96%B9%E6%B3%95/
 */

export type SFCWithInstall<T> = T & Plugin;

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null,
};

// 组件
export const withInstall = <T, E extends Record<string, any>>(
  main: T,
  extra?: E
) => {
  // 定义 install 属性
  ;(main as SFCWithInstall<T>).install = (app): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }
  return main as SFCWithInstall<T> & E
}

// 函数
export const withInstallFunction = <T>(fn: T, name: string) => {
  ;(fn as SFCWithInstall<T>).install = (app: App) => {
    ;(fn as SFCInstallWithContext<T>)._context = app._context
    app.config.globalProperties[name] = fn
  }

  return fn as SFCInstallWithContext<T>
}
