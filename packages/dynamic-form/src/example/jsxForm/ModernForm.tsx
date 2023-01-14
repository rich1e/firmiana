import { ElButton, ElForm, ElFormItem, ElInputNumber } from 'element-plus';
import { reactive, ref, defineComponent } from 'vue';

import {
  renderCheckbox,
  renderInput,
  renderRadio,
  renderSelect,
  renderSlots,
  renderSwitch,
} from './components/fields';
import { checkEmpty } from '../../components/DynamicForm/src/hooks/useValidator';

export default defineComponent({
  name: 'ModernForm',
  setup() {
    const formRef = ref<InstanceType<typeof ElForm> | null | any>(null);

    const formModel = reactive({
      username: '',
      gender: '',
      secondname: '',
      married: false,
      city: '',
      referees: [],
      num: 1,
    });

    const formRules = {
      username: [{ validator: checkEmpty, trigger: 'blur' }],
      gender: [{ validator: checkEmpty, trigger: 'blur' }],
      secondname: [{ validator: checkEmpty, trigger: 'blur' }],
      married: [{ validator: checkEmpty, trigger: 'blur' }],
      referees: [{ validator: checkEmpty, trigger: 'blur' }],
      num: [
        {
          validator: (rule: any, value: any, callback: any) => {
            if (value < 5) {
              callback(new Error(`It's Num must than 5`));
            } else {
              callback();
            }
          },
          trigger: 'blur',
        },
      ],
    };

    const formActions = {
      onSubmit: () => {
        formRef.value.validate((valid: any) => {
          if (valid) {
            console.log('submit!');
            console.table(formModel);
          } else {
            console.log('error submit!');
            return false;
          }
        });
      },
      onRest: () => {
        formRef.value.resetFields();
      },
      onCancel: () => {
        console.log('onCancel Handler');
      },
    };

    const formFields = [
      {
        type: 'input',
        label: 'User name',
        prop: 'username',
        props: {
          modelValue: formModel.username,
          // 当输入框发生变化时，将 value 赋值给 formModel 对象
          'onUpdate:modelValue': (value: any) => (formModel.username = value),
        },
      },
      {
        type: 'input',
        label: 'Second name',
        prop: 'secondname',
        props: {
          modelValue: formModel.secondname,
          'onUpdate:modelValue': (value: any) => (formModel.secondname = value),
        },
      },
      {
        type: 'radio',
        label: 'Gender',
        prop: 'gender',
        props: {
          modelValue: formModel.gender,
          'onUpdate:modelValue': (value: any) => (formModel.gender = value),
          labels: [
            { label: 1, title: 'male2' },
            { label: 2, title: 'female' },
          ],
        },
      },
    ];

    const renderFields = function (options?: any) {
      const defaults = [
        {
          type: 'input',
          label: 'User name',
          prop: 'username',
          props: {
            modelValue: formModel.username,
            // 当输入框发生变化时，将 value 赋值给 formModel 对象
            'onUpdate:modelValue': (value: any) => (formModel.username = value),
          },
        },
        {
          type: 'input',
          label: 'Second name',
          prop: 'secondname',
          props: {
            modelValue: formModel.secondname,
            'onUpdate:modelValue': (value: any) =>
              (formModel.secondname = value),
          },
        },
        {
          type: 'radio',
          label: 'Gender',
          prop: 'gender',
          props: {
            modelValue: formModel.gender,
            'onUpdate:modelValue': (value: any) => (formModel.gender = value),
            labels: [
              { label: 1, title: 'male' },
              { label: 2, title: 'female' },
            ],
          },
        },
        {
          type: 'switch',
          label: 'Married',
          prop: 'married',
          props: {
            modelValue: formModel.married,
            'onUpdate:modelValue': (value: any) => (formModel.married = value),
            activeText: 'Yes',
            inactiveText: 'No',
          },
        },
        {
          type: 'select',
          label: 'City from',
          prop: 'city',
          props: {
            modelValue: formModel.city,
            'onUpdate:modelValue': (value: any) => (formModel.city = value),
            options: [
              { vlaue: 0, label: 'Beijing' },
              { vlaue: 1, label: 'Shanghai' },
            ],
          },
        },
        {
          type: 'checkbox',
          label: 'Referees',
          prop: 'referees',
          props: {
            modelValue: formModel.referees,
            'onUpdate:modelValue': (value: any) => (formModel.referees = value),
            labels: ['colleagues', 'friends', 'teachers'],
          },
        },
        {
          type: 'slots',
          label: 'Slots Test',
          prop: 'num',
          render: () => {
            const onChangeNumber = (value: any) => {
              console.log(value);
            };

            return (
              <ElInputNumber
                v-model={formModel.num}
                min={1}
                max={10}
                onChange={onChangeNumber}
              />
            );
          },
        },
      ];

      const fields = options ?? defaults;

      return fields.map((item: any) => {
        const getComponent = (type: string, props: any, render?: any) => {
          if (type === 'input') return renderInput(props);
          else if (type === 'switch') return renderSwitch(props);
          else if (type === 'checkbox') return renderCheckbox(props);
          else if (type === 'radio') return renderRadio(props);
          else if (type === 'select') return renderSelect(props);
          // slots 特殊处理
          else if (type === 'slots') return renderSlots(render);
        };

        return (
          <ElFormItem label={item.label} prop={item.prop}>
            {getComponent(item.type, item.props, item.render)}
          </ElFormItem>
        );
      });
    };

    return () => (
      <ElForm ref={formRef} model={formModel} rules={formRules}>
        {/* {renderFields(formFields)} */}
        {renderFields()}
        <ElFormItem>
          <ElButton onClick={formActions.onSubmit}>Submit</ElButton>
          <ElButton onClick={formActions.onCancel}>Cancel</ElButton>
          <ElButton onClick={formActions.onRest}>Rest</ElButton>
        </ElFormItem>
      </ElForm>
    );
  },
});
