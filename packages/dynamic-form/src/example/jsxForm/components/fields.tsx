/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-28 13:40:12
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-28 15:14:35
 * @FilePath: /vue-form/src/example/jsxForm/components/fields.tsx
 * @Description:
 *
 */

import {
  ElCheckbox,
  ElCheckboxGroup,
  ElInput,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElSelect,
  ElSwitch,
} from 'element-plus';
import { ref } from 'vue';

/**
 * @see https://juejin.cn/post/6997796393460957215#heading-7
 * @param props 输入框属性
 * @returns
 */
export const renderInput = (props: any) => {
  // props 解构之后，会丢失响应性，通过 ref 补充响应性
  const { modelValue, ...rest } = props;
  const modeValueRef = ref(modelValue);

  return (
    <ElInput
      {...{
        modelValue: modeValueRef.value,
        // 当输入框发生变化时，将 value 赋值给绑定变量 props.modelValue
        'onUpdate:modelValue': (value: any) => (modeValueRef.value = value),
      }}
      {...rest}
    />
  );
};

export const renderSwitch = (props: any) => {
  return <ElSwitch {...props} />;
};

export const renderCheckbox = (props: any) => {
  const { labels, ...rest } = props;
  return (
    <ElCheckboxGroup {...rest}>
      {labels.map((item: any) => {
        return <ElCheckbox label={item} />;
      })}
    </ElCheckboxGroup>
  );
};

export const renderRadio = (props: any) => {
  const { labels, ...rest } = props;
  // const { labels, modelValue, ...rest } = props;
  // const modeValueRef = ref(modelValue);
  // const radioRef = ref(false);

  return (
    <ElRadioGroup
      // {...{
      //   modelValue: modeValueRef.value,
      //   // 当输入框发生变化时，将 value 赋值给绑定变量 props.modelValue
      //   'onUpdate:modelValue': (value: any) => {
      //     console.log('renderRadio1', value);
      //     modeValueRef.value = value;
      //     radioRef.value = value;
      //   },
      // }}
      // v-model={modeValueRef.value}
      {...rest}
    >
      {labels.map((item: any) => {
        return (
          <ElRadio
            // {...{
            //   modelValue: radioRef.value,
            //   // 当输入框发生变化时，将 value 赋值给绑定变量 props.modelValue
            //   'onUpdate:modelValue': (value: any) => {
            //     console.log('renderRadio2', value);
            //     console.log('renderRadio2', value === item.label);
            //     radioRef.value = value === item.label;
            //   },
            // }}
            label={item.label}
          >
            {item.title}
          </ElRadio>
        );
      })}
    </ElRadioGroup>
  );
};

export const renderSelect = (props: any) => {
  const { options, ...rest } = props;

  return (
    <ElSelect {...rest}>
      {options.map((item: any) => {
        return (
          <ElOption label={item.label} value={item.vlaue} key={item.vlaue} />
        );
      })}
    </ElSelect>
  );
};

export const renderSlots = (render: any) => {
  if (render) {
    return render();
  }
};
