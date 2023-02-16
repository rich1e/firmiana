/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-02-15 18:57:34
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-02-16 13:04:32
 * @FilePath     : /firmiana/packages/form-plux/components/button/src/index.tsx
 * @Description  :
 *
 */

import { defineComponent } from 'vue';
import { ElButton } from 'element-plus';
import { buttonProps } from './button';
import style from '../style/index.module.scss';

export const XButton = defineComponent({
  name: 'FButton',
  props: buttonProps,
  setup(props, { attrs, slots }) {
    console.log(props);

    return () => (
      <ElButton class={style['f-button__hidden']} {...attrs} v-slots={slots} />
    );
  },
});
