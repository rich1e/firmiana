/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-24 15:35:04
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-24 15:54:58
 * @FilePath: /vue-form/src/shim-tsx.d.ts
 * @Description:
 *
 */

/**
 * @see https://github.com/vuejs/composition-api/blob/main/README.zh-CN.md
 * @see https://giters.com/yejiajiehz/vue3.0-tsx
 */
import Vue, { VNode } from 'vue';
import { ComponentRenderProxy } from '@vue/composition-api';

// tsx 支持
interface VueAttributes {
  key?: string | number;
  slot?: string;
  scopedSlots?: Record<string, Function>;
  ref?: string;
  class?: string;
  children?: any;
  domProps?: { [key: string]: any };
  modeValue?: any;
  on?: Record<string, Function | Function[]>;
  // typescript 4.4 支持
  [key: `on${string}`]: any;
}

// 设置内置属性可可选
type PartialField<T, U extends string> = Partial<Omit<T, U>> & {
  [key in U]?: key extends keyof T ? Partial<T[key]> : any;
};

// 默认属性，如 id，name，style 等
type HTMLAttributes<T = HTMLElement> = PartialField<T, 'style'> & VueAttributes;

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends ComponentRenderProxy {}
    interface ElementAttributesProperty {
      $props: any; // specify the property name to use
    }

    interface IntrinsicAttributes extends VueAttributes {}

    // 内置元素
    interface IntrinsicElements {
      // 内置标签，为了更好的提醒，可以在这里定义 HTML tag
      div: HTMLAttributes<HTMLDivElement>;
      [elem: string]: any;
    }
  }
}
