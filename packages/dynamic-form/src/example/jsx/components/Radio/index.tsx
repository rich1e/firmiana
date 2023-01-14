/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-22 15:53:33
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-22 16:57:10
 * @FilePath: /vue-form/src/example/jsx/components/Radio/index.tsx
 * @Description:
 *
 */
import { ref, defineComponent } from 'vue';
import { ElRadio, ElRadioGroup, ElRadioButton } from 'element-plus';

export default defineComponent({
  name: 'InRadio',
  props: {
    options: {
      type: Array as any,
      default: [],
    },
    modelValue: {
      type: [String, Number, Boolean] as any,
      default: '',
    },
    radioEvent: {
      type: Object,
      defaule: {},
    },
    isButtonStyle: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { attrs }) {
    const { options, modelValue, radioEvent, isButtonStyle } = _;
    const initValue = ref(modelValue);

    const radioOptionsRender = (radioOptions: any[]) => {
      return (
        <>
          {radioOptions.map((radio) => {
            const { label, title } = radio;

            if (isButtonStyle) {
              return (
                <ElRadioButton label={label} {...radioEvent}>
                  {title}
                </ElRadioButton>
              );
            } else {
              return (
                <ElRadio label={label} {...radioEvent}>
                  {title}
                </ElRadio>
              );
            }
          })}
        </>
      );
    };

    return () => (
      <ElRadioGroup v-model={initValue.value} {...attrs}>
        {radioOptionsRender(options)}
      </ElRadioGroup>
    );
  },
});
