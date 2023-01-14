/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-21 17:05:16
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-24 14:40:18
 * @FilePath: /vue-form/src/example/jsx/components/CustInput/index.tsx
 * @Description:
 *
 */
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'CustInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(_, { attrs, emit }) {
    console.log('CustInput#1', attrs);
    // const { modelValue } = toRefs(_);
    // return () => <input {...attrs} />;

    return () => (
      <input
        type="text"
        value={_.modelValue}
        onInput={($event: any): any => {
          console.log('searchText', $event.target.value);
          emit('update:modelValue', $event.target.value);
        }}
      />
    );
  },
});
