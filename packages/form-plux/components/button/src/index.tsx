/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-12-09 16:36:22
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-30 16:49:08
 * @FilePath: /firmiana/packages/form-plux/button/src/index.tsx
 * @Description:
 *
 */
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { buttonProps } from './button'
import style from '../style/index.module.scss'

export const XButton = defineComponent({
  name: 'FButton',
  props: buttonProps,
  setup(props, { attrs, slots }) {
    console.log(props)

    return () => (
      <ElButton class={style['f-button__hidden']} {...attrs} v-slots={slots} />
    )
  },
})
