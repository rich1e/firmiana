<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-03 14:10:27
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-06 15:40:55
 * @FilePath: /vue-form/src/views/Tab.vue
 * @Description:
 *
-->
<script setup lang="ts">
  import BaseViewVue from '../components/Layouts/BaseView.vue';
  import DynamicForm from '../components/DynamicForm';
  import { ConfigType } from '../components/DynamicForm/types';
  import {
    checkAge,
    checkEmpty,
  } from '../components/DynamicForm/src/hooks/useValidator';
  import { pageBack } from '../components/DynamicForm/src/hooks/useActions';

  const rule = {
    username: [{ validator: checkEmpty, trigger: 'blur', required: true }],
    age: [{ validator: checkAge, trigger: 'blur', required: true }],
    birth: [{ validator: checkEmpty, trigger: 'change', required: true }],
    /** 自定义组件规则 */
    slots1: [{ validator: checkEmpty, trigger: 'blur', required: true }],
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
    onBack: {
      btnText: '返回',
      handler: () => {
        console.debug('onBack');
        pageBack();
      },
    },
    onCancel: {
      btnText: '取消',
      handler: () => {
        console.debug('onCancel');
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
    scene: 'tab',
    tabs: {
      tabType: 'border-card',
      tabPanes: [
        {
          title: 'Uniseriate',
          paneType: 'uniseriate',
          uniseriate: [
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
        },
        {
          title: 'Biserial',
          paneType: 'biserial',
          biserial: [
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
              label: '自定义3',
              prop: 'slots3',
            },
          ],
        },
        {
          title: 'Group',
          paneType: 'group',
          group: [
            [
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
                control: 'Slots',
                label: '自定义2',
                prop: 'slots2',
              },
              {
                control: 'Slots',
                label: '自定义4',
                prop: 'slots4',
              },
            ],
            [
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
            ],
          ],
        },
      ],
    },
    rule,
    actions,
  };
</script>

<template>
  <BaseViewVue>
    <template #header> Tab </template>
    <template #main>
      <DynamicForm :config="formConfig">
        <!-- TODO tab 有多个表单组合，当前的自定义插件在每个表单都有唯一的实例。但是，每个表单的自定义插件都是同一个。 -->
        <template #slots1="{ fieldModel }">
          <ElInput v-model="fieldModel[`slots1`]" />
        </template>
        <template #slots2="{ fieldModel }">
          <ElInput v-model="fieldModel[`slots2`]" />
        </template>
        <template #slots3="{ fieldModel }">
          <ElInput v-model="fieldModel[`slots3`]" />
        </template>
        <template #slots4="{ fieldModel }">
          <ElInput v-model="fieldModel[`slots4`]" />
        </template>
      </DynamicForm>
    </template>
  </BaseViewVue>
</template>
