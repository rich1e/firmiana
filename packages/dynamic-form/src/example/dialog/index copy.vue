<script setup lang="ts">
  import { ElButton, ElDialog } from 'element-plus';
  import { ref } from 'vue';

  import DynamicForm from '/@/components/DynamicForm';
  import { pageBack } from '/@/components/DynamicForm/src/hooks/useActions';
  import {
    checkAge,
    checkEmpty,
  } from '/@/components/DynamicForm/src/hooks/useValidator';
  import type { ConfigType } from '/@/components/DynamicForm/types';
  import BaseViewVue from '/@/components/Layouts/BaseView.vue';

  const dialogVisible = ref(false);

  const rule = {
    username: [{ validator: checkEmpty, trigger: 'blur', required: true }],
    age: [{ validator: checkAge, trigger: 'blur', required: true }],
    birth: [{ validator: checkEmpty, trigger: 'change', required: true }],
    slots1: [{ validator: checkEmpty, trigger: 'blur', required: true }],
    slots2: [{ validator: checkEmpty, trigger: 'blur', required: true }],
  };

  const actions = {
    onSubmit: {
      btnText: '提交',
      handler: (formEl: any) => {
        if (!formEl) return;
        formEl.validate((valid: any) => {
          if (valid) {
            console.table(formEl.model);
            console.debug('submit for view!');
          } else {
            console.debug('error submit!');
            return false;
          }
        });
      },
    },
    onCancel: {
      btnText: '取消',
      handler: () => {
        console.debug('onCancel');
      },
    },
    onBack: {
      btnText: '返回',
      handler: () => {
        console.debug('onBack');
        pageBack();
      },
    },
    onRest: {
      btnText: '重置',
      handler: (formEl: any) => {
        console.debug('onRest for view');
        if (!formEl) return;
        formEl.resetFields();
      },
    },
  };

  const formConfig: ConfigType = {
    scene: 'biserial',
    field: [
      {
        control: 'Input',
        label: '姓名',
        prop: 'username',
        props: {
          type: 'text',
          placeholder: '请输入姓名',
          modelValue: 'username',
        },
        bind: 'x',
        default: '-',
      },
      {
        control: 'Input',
        label: '曾用名',
        prop: 'iiusername',
        props: {
          type: 'text',
          placeholder: '请输入姓名',
          modelValue: 'iiusername',
        },
        bind: 'x',
        default: '-',
      },
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
        control: 'Select',
        label: '出生地',
        prop: 'birth',
        props: {
          placeholder: '请选择出生地',
          modelValue: 'birth',
        },
        options: [
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
          {
            value: 'Option4',
            label: '重庆',
          },
          {
            value: 'Option5',
            label: '天津',
          },
        ],
        bind: 'x',
        disabled: true,
      },
      {
        control: 'Slots',
        label: '自定义1',
        prop: 'slots1',
      },
      {
        control: 'Slots',
        label: '自定义2',
        prop: 'slots2',
      },
    ],
    rule,
    actions,
  };
</script>

<template>
  <BaseViewVue>
    <template #header> Dialog </template>
    <template #main>
      <ElButton text @click="dialogVisible = true"> 打开弹窗 </ElButton>
      <ElDialog v-model="dialogVisible">
        <DynamicForm :config="formConfig">
          <template #slots1="{ fieldModel }">
            <ElInput v-model="fieldModel[`slots1`]" />
          </template>
          <template #slots2="{ fieldModel }">
            <ElInput v-model="fieldModel[`slots2`]" />
          </template>
        </DynamicForm>
      </ElDialog>
    </template>
  </BaseViewVue>
</template>
