/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-21 17:05:16
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-28 15:58:45
 * @FilePath: /vue-form/src/example/dynamicComponents/components/input.tsx
 * @Description:
 *
 */
import { defineComponent } from 'vue';
import { ElInput } from 'element-plus';

export default defineComponent({
  name: 'DyInput',
  setup(_, { attrs }) {
    console.log('InInput#', attrs);
    return () => <ElInput {...attrs} />;
  },
});
