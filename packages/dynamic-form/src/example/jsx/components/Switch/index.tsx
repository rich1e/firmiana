/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-21 17:05:16
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-21 19:17:09
 * @FilePath: /vue-form/src/example/jsx/components/Switch/index.tsx
 * @Description:
 *
 */
import { defineComponent } from 'vue';
import { ElSwitch } from 'element-plus';

export default defineComponent({
  name: 'InSwitch',
  setup(_, { attrs }) {
    // 使用 JSX 的时候，传递 modelValue 参数不起作用；
    // 理论上需要配合 onUpdate:modelValue 事件触发，
    // 但 ElSwitch 组件使用了3个事件来更新值，因此暂时用 v-model 绑定
    return () => <ElSwitch {...attrs} />;
  },
});
