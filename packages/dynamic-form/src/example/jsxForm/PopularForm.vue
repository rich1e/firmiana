<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-28 13:22:22
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-06 15:43:03
 * @FilePath: /vue-form/src/example/jsxForm/PopularForm.vue
 * @Description:
 *
-->
<script lang="tsx">
  import {
    ElButton,
    ElCheckbox,
    ElCheckboxGroup,
    ElForm,
    ElFormItem,
    ElInput,
    ElInputNumber,
    ElOption,
    ElRadio,
    ElRadioGroup,
    ElSelect,
    ElSwitch,
  } from 'element-plus';
  import { defineComponent, reactive, ref } from 'vue';

  import { checkEmpty } from '../../components/DynamicForm/src/hooks/useValidator';

  export default defineComponent({
    name: 'PopularForm',
    props: {
      formRef: {
        type: Object as any,
        default: {},
      },
      formModel: {
        type: Object as any,
        default: {},
      },
      formRules: {
        type: Object as any,
        default: {},
      },
      formFields: {
        type: Array as any,
        default: [],
      },
    },
    setup(_) {
      // const formRef = ref<InstanceType<typeof ElForm> | null | any>(null);

      const { formModel, formRules, formRef, formFields } = _;

      // const formModel = reactive({
      //   username: '',
      //   gender: '',
      //   secondname: '',
      //   married: false,
      //   city: '',
      //   referees: [],
      //   slots: 1,
      // });

      // const formRules = {
      //   username: [{ validator: checkEmpty, trigger: 'blur' }],
      //   gender: [{ validator: checkEmpty, trigger: 'blur' }],
      //   secondname: [{ validator: checkEmpty, trigger: 'blur' }],
      //   married: [{ validator: checkEmpty, trigger: 'blur' }],
      //   referees: [{ validator: checkEmpty, trigger: 'blur' }],
      // };

      const onSubmit = () => {
        formRef.value.validate((valid: any) => {
          if (valid) {
            console.log('submit!');
            console.table(formModel);
          } else {
            console.log('error submit!');
            return false;
          }
        });
      };

      const onRest = () => {
        formRef.value.resetFields();
      };

      const onChangeNumber = (value: any) => {
        console.log('onChangeNumber', value);
      };

      const renderFields = (item: any) => {
        return (
          <ElFormItem label={item.label} prop={item.prop}>
            <ElInput
              modelValue={item.inputVal}
              onUpdate:modelValue={(value) => (item.inputVal = value)}
            />
          </ElFormItem>
        );
      };

      const renderFieldsByTemplate = () => {
        return (
          <>
            <ElFormItem label={'User name'} prop={'username'}>
              <ElInput
                modelValue={formModel.username}
                onUpdate:modelValue={(value) => (formModel.username = value)}
              />
            </ElFormItem>
            <ElFormItem label={'Second name'} prop={'secondname'}>
              <ElInput
                modelValue={formModel.secondname}
                onUpdate:modelValue={(value) => (formModel.secondname = value)}
              />
            </ElFormItem>
            <ElFormItem label={'Gender'} prop={'gender'}>
              <ElRadioGroup
                modelValue={formModel.gender}
                onUpdate:modelValue={(value) => (formModel.gender = value)}
              >
                {[
                  { label: 1, title: 'male' },
                  { label: 2, title: 'female' },
                ].map((item) => {
                  return <ElRadio label={item.label}>{item.title}</ElRadio>;
                })}
              </ElRadioGroup>
            </ElFormItem>
            <ElFormItem label={'Married'} prop={'married'}>
              <ElSwitch
                v-model={formModel.married}
                // modelValue={formModel.married}
                // onUpdate:modelValue={(value: any) => (formModel.married = value)}
              />
            </ElFormItem>
            <ElFormItem label={'City from'} prop={'city'}>
              <ElSelect v-model={formModel.city}>
                {[
                  { vlaue: 0, label: 'Beijing' },
                  { vlaue: 1, label: 'Shanghai' },
                ].map((item) => {
                  return (
                    <ElOption
                      label={item.label}
                      value={item.vlaue}
                      key={item.vlaue}
                    />
                  );
                })}
              </ElSelect>
            </ElFormItem>
            <ElFormItem label={'Referees'} prop={'referees'}>
              <ElCheckboxGroup
                // v-model={formModel.referees}
                modelValue={formModel.referees}
                onUpdate:modelValue={(value: any) =>
                  (formModel.referees = value)
                }
              >
                {['colleagues', 'friends', 'teachers'].map((item: any) => {
                  return <ElCheckbox label={item} />;
                })}
              </ElCheckboxGroup>
            </ElFormItem>
            <ElFormItem label={'Slots Test'} prop={'slots'}>
              <ElInputNumber
                v-model={formModel.slots}
                min={1}
                max={10}
                onChange={onChangeNumber}
              />
            </ElFormItem>
          </>
        );
      };

      return () => (
        <ElForm ref={formRef} model={formModel} rules={formRules}>
          {/* {formFields.map((item: any) => {
            return renderFields(item);
          })} */}
          {renderFieldsByTemplate()}
          <ElFormItem>
            <ElButton onClick={onSubmit}>Submit</ElButton>
            <ElButton>Cancel</ElButton>
            <ElButton onClick={onRest}>Rest</ElButton>
          </ElFormItem>
        </ElForm>
      );
    },
  });
</script>
