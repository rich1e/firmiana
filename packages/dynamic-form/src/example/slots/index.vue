<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-23 18:36:22
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-06 15:43:19
 * @FilePath: /vue-form/src/example/slots/index.vue
 * @Description:
 *
-->
<template>
  <ElDivider>Slots</ElDivider>
  <ElForm
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    :style="{ textAlign: 'left' }"
  >
    <FormFields :dynamic-model="ruleForm" :field="formJson">
      <template #slots="{ formModel }">
        <ElInput v-model="formModel[`slots`]" />
      </template>
      <template #slots1="{ formModel }">
        <ElInput v-model="formModel[`slots1`]" />
      </template>
    </FormFields>

    <ElFormItem>
      <ElButton type="primary" @click="submitForm(ruleFormRef)">
        Submit
      </ElButton>
      <ElButton @click="resetForm(ruleFormRef)">Reset</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts" setup>
  import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus';
  import { provide, reactive, ref } from 'vue';
  import { checkAge, checkEmpty } from './rules';

  import FormFields from './fields.vue';
  import { FieldType } from '../../components/DynamicForm/types';
  import { formInjectionKey } from './keys';

  type FormRefType = InstanceType<typeof ElForm>;

  const ruleFormRef = ref<InstanceType<typeof ElForm> | null | any>(null);

  const ruleForm: any = reactive({});

  provide(formInjectionKey, ruleForm);

  const rules = reactive({
    age: [{ validator: checkAge, trigger: 'blur' }],
    married: [{ validator: checkEmpty, trigger: 'blur' }],
    slots: [{ validator: checkEmpty, trigger: 'blur' }],
    slots1: [{ validator: checkEmpty, trigger: 'blur' }],
  });

  const formJson = [
    {
      control: 'Input',
      label: '年龄',
      prop: 'age',
      props: {
        type: 'text',
        placeholder: '请输入年龄',
        modelValue: 'age',
      },
      bind: 'x',
      default: '-',
    },
    {
      control: 'Switch',
      label: '已婚',
      prop: 'married',
      props: {
        activeText: '是',
        inactiveText: '否',
        modelValue: 'married',
      },
      bind: 'x',
      default: '-',
    },
    {
      control: 'Slots',
      label: '自定义1',
      prop: 'slots',
    },
    {
      control: 'Slots',
      label: '自定义2',
      prop: 'slots1',
    },
  ] as FieldType[];

  const submitForm = (formEl: FormRefType | undefined) => {
    if (!formEl) return;
    formEl.validate((valid: any) => {
      if (valid) {
        console.table(ruleForm);
        console.log('submit!');
      } else {
        console.log('error submit!');
        return false;
      }
    });
  };

  const resetForm = (formEl: FormRefType | undefined) => {
    if (!formEl) return;
    console.log('formEl#', formEl);
    formEl.resetFields();
  };
</script>
