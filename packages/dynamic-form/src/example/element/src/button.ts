import { defaultTheme } from 'vuepress';
/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-02-15 18:57:34
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-03-01 15:16:48
 * @FilePath     : /firmiana/packages/dynamic-form/src/example/element/src/button.ts
 * @Description  :
 *
 */
import { defineComponent, h } from 'vue';
import { ElButton } from 'element-plus';

/**
 * @see https://cn.vuejs.org/api/render-function.html#h
 */
export const FButton = defineComponent({
  name: 'FButton',
  // inheritAttrs: false,
  props: {
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { attrs, slots }) {
    console.log(props);
    console.log(attrs);
    return () => h(ElButton, null, slots);
  },
});
