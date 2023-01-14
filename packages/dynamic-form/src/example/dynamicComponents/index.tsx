/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-24 19:55:11
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-28 21:00:01
 * @FilePath: /vue-form/src/example/dynamicComponents/index.tsx
 * @Description:
 *
 */
import { computed, defineComponent, reactive, ref, h } from 'vue';
import { ElButton, ElDivider, ElForm, ElFormItem, ElInput } from 'element-plus';

import {
  renderCheckbox,
  renderInput,
  renderRadio,
  renderSelect,
  renderSlots,
  renderSwitch,
} from './components/fields';

import DyInput from './components/input';

export default defineComponent({
  name: '',
  setup() {
    const renderDynamicComponents = () => {
      const formModel = reactive({
        test1: '',
        test2: '',
        test3: true,
      });

      const onSubmit = () => {
        console.log(formModel);
      };

      const renderFields = (item: any) => {
        const { props } = item;

        const getComponent = (type: string) => {
          type tplotOptions = {
            [key: string]: any;
          };

          const components: tplotOptions = {
            input: DyInput,
          };

          return components[type];
        };

        const DyComponent = computed(() => getComponent(item.type as string));
        // console.log(DyComponent);

        const { modelValue, ...rest } = props;
        const modelValueRef = ref(modelValue);

        return (
          <DyComponent.value
            // v-model={modelValue}
            // {...{
            //   'onUpdate:modelValue': (value: any) => {
            //     console.log(value);
            //     modelValueRef.value = value;
            //   },
            // }}
            // {...rest}
            {...props}
          />
        );
        // return <DyComponent.value {...props} />;
      };

      const renderElinput = () => {
        return h(ElInput, {
          modelValue: formModel.test1,
          'onUpdate:modelValue': (value) => {
            // console.log(value);
            formModel.test1 = value;
          },
          placeholder: 'test',
        });
      };

      return (
        <ElForm>
          <ElFormItem>{renderElinput()}</ElFormItem>
          <ElFormItem>
            <ElButton onClick={onSubmit}>Submit</ElButton>
            <ElButton>Cancel</ElButton>
            <ElButton>Rest</ElButton>
          </ElFormItem>
        </ElForm>
      );
    };

    const render = () => {
      return (
        <>
          <ElDivider>Dynamic Components</ElDivider>
          {renderDynamicComponents()}
        </>
      );
    };

    return () => {
      return <>{render()}</>;
    };
  },
});
