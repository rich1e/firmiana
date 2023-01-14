/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-22 18:02:56
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-23 20:41:16
 * @FilePath: /vue-form/src/example/jsx/components/Checkbox/index.tsx
 * @Description:
 *
 */
import { defineComponent } from 'vue';
import { ElCheckbox, ElCheckboxGroup } from 'element-plus';

export default defineComponent({
  name: 'InCheckbox',
  props: {
    multiple: {
      type: Array as any,
      default: [],
    },
    group: {
      type: Object as any,
      default: {},
    },
  },
  setup(_, { attrs }) {
    const { multiple, group } = _;

    console.log('attrs', attrs);
    console.log('multiple', multiple);

    /**
     * @see https://www.cnblogs.com/ranyonsue/p/15900174.html
     */
    if (Object.keys(group).length > 0) {
      const { modelValue, checkboxs } = group;

      return () => (
        <ElCheckboxGroup v-model={modelValue.value}>
          {checkboxs.map((box: any) => {
            return <ElCheckbox {...box} />;
          })}
        </ElCheckboxGroup>
      );
    }

    if (multiple.length > 0) {
      console.log('multiple');
      return () => (
        <>
          {multiple.map((box: any, idx: any) => {
            console.log('box', box);
            return <ElCheckbox {...box} key={`ckb${idx}`} />;
          })}
        </>
      );
    }

    return () => <ElCheckbox {...attrs} />;
  },
});
