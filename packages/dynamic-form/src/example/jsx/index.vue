<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-21 14:38:54
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-06 15:42:30
 * @FilePath: /vue-form/src/example/jsx/index.vue
 * @Description:
 *
-->

<script lang="tsx">
  import { ref, defineComponent } from 'vue';
  import { ElDivider, ElCheckbox, ElCheckboxGroup } from 'element-plus';

  import InSwitch from '../../example/jsx/components/Switch';
  import InSelect from '../../example/jsx/components/Select';
  import InInput from '../../example/jsx/components/Inputs';
  import InRadio from '../../example/jsx/components/Radio';
  import InCheckbox from '../../example/jsx/components/Checkbox';

  export default defineComponent({
    name: 'Jsx',
    setup() {
      const initSwitchValue = ref(true);

      const switchOptions = {
        // vModel: initSwitchValue.value,
        activeText: 'test',
      };

      const initSelectValue = ref('');

      const selectOptions = [
        {
          value: 'Option1',
          label: '上海',
        },
        {
          value: 'Option2',
          label: '北京',
        },
        {
          value: 'Option3',
          label: '深圳',
        },
      ];

      const selectAttrs = {
        onChange: (val: any) => {
          console.log('selectAttrs onChange', val);
        },
      };

      const initInputValue = ref('');

      const textInputOptions = {
        type: 'text',
        placeholder: '文本输入框',
        clearable: true,
        onChange: (val: any) => {
          console.log('text onChange', val);
        },
        // onChange 是 Element Plus 事件，onchange 是DOM原始事件
        // onchange: (val: any) => {
        //   console.log('input onchange', val);
        // },
        // showWordLimit: true,
      };

      const textareaInputOptions = {
        type: 'textarea',
        placeholder: '多行文本输入框',
        clearable: true,
        onChange: (val: any) => {
          console.log('textarea onChange', val);
        },
        // onChange 是 Element Plus 事件，onchange 是DOM原始事件
        // onchange: (val: any) => {
        //   console.log('input onchange', val);
        // },
        // showWordLimit: true,
      };

      const initRadioValue = ref(3);

      const radioOptions = [
        {
          label: 3,
          title: 'Option A',
        },
        {
          label: 6,
          title: 'Option B',
        },
        {
          label: 9,
          title: 'Option C',
        },
      ];

      const radioEvent = {
        onChange: (val: any) => {
          console.log('radio onChange', val.target ? val.target.value : val);
        },
      };

      const initCheckBoxValue1 = ref(false);
      const initCheckBoxList = ref(['Options 1', 'Options 2']);

      const checkboxOptions = {
        vModel: initCheckBoxValue1.value,
        label: 'Options 1',
        onChange: (val: any) => {
          console.log('checkboxOptions onChange', val);
        },
      };

      const checkboxMultOptions = [
        {
          // vModel: initCheckBoxValue1.value,
          label: 'Options 1',
          onChange: (val: any) => {
            console.log('checkboxMultOptions onChange', val);
          },
        },
        {
          // vModel: initCheckBoxValue1.value,
          label: 'Options 2',
          onChange: (val: any) => {
            console.log('checkboxMultOptions onChange', val);
          },
        },
        {
          // vModel: initCheckBoxValue1.value,
          label: 'Options 3',
          onChange: (val: any) => {
            console.log('checkboxMultOptions onChange', val);
          },
        },
      ];

      const checkboxGroupOptions = {
        modelValue: initCheckBoxList,
        checkboxs: [
          {
            label: 'Options 1',
            onChange: (val: any) => {
              console.log('checkboxGroupOptions onChange', val);
            },
          },
          {
            label: 'Options 2',
            onChange: (val: any) => {
              console.log('checkboxMultOptions onChange', val);
            },
          },
          {
            label: 'Options 3',
            onChange: (val: any) => {
              console.log('checkboxMultOptions onChange', val);
            },
          },
        ],
      };

      return () => (
        <>
          <ElDivider>InSwitch</ElDivider>
          <InSwitch v-model={initSwitchValue.value} {...switchOptions} />
          <ElDivider>InSelect</ElDivider>
          <InSelect
            v-model={initSelectValue.value}
            options={selectOptions}
            {...selectAttrs}
          />
          <ElDivider>InInput</ElDivider>
          <InInput v-model={initInputValue.value} {...textInputOptions} />
          <InInput v-model={initInputValue.value} {...textareaInputOptions} />
          <ElDivider>InRadio</ElDivider>
          <InRadio
            modelValue={initRadioValue.value}
            options={radioOptions}
            radioEvent={radioEvent}
          />
          <InRadio
            modelValue={initRadioValue.value}
            options={radioOptions}
            radioEvent={radioEvent}
            isButtonStyle={true}
          />
          <ElDivider>InCheckbox</ElDivider>
          <InCheckbox {...checkboxOptions} />
          <br />
          <InCheckbox multiple={checkboxMultOptions} />
          <br />
          <InCheckbox group={checkboxGroupOptions} />
        </>
      );
    },
  });
</script>
