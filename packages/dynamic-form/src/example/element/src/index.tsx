/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-02-15 18:57:34
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-03-01 15:25:38
 * @FilePath     : /firmiana/packages/dynamic-form/src/example/element/src/index.tsx
 * @Description  :
 *
 */

import { defineComponent } from 'vue';
import { ElButton } from 'element-plus';
import style from '../style/index.module.scss';

export const XButton = defineComponent({
  name: 'XButton',
  props: {
    shadow: {
      type: Boolean,
      defalut: false,
    },
  },
  // setup(props, { attrs, slots }) {
  setup(props, { slots }) {
    console.log(props);
    const { shadow } = props;
    const addShadow = shadow ? style['x-button__shadow'] : '';

    return () => (
      // <ElButton class={isVisible} {...attrs} v-slots={slots} />
      <ElButton class={addShadow} v-slots={slots} />
    );
  },
});
