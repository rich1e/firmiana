/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-12-09 16:36:22
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-09 17:41:04
 * @FilePath: /firmiana/packages/form-plux/button/index.tsx
 * @Description:
 *
 */
import { defineComponent } from 'vue';
import { ElButton } from 'element-plus';

export const XButton = defineComponent({
  name: 'XButton',
  setup(_, { attrs, slots }) {
    return () => (
      <ElButton {...attrs} v-slots={slots} />
    );
  }
});
