<!--
 * @Author: rich1e
 * @Date: 2022-11-14 12:37:25
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-06 15:44:43
-->
<script lang="ts">
  export default {
    name: 'FormFields',
  };
</script>

<script setup lang="ts">
  import {
    ElCheckbox,
    ElFormItem,
    ElInput,
    ElOption,
    ElSelect,
    ElSwitch,
  } from 'element-plus';
  import { inject } from 'vue';
  import type { PropType } from 'vue';
  import { formInjectionKey } from './keys';
  import { FieldType } from '../../components/DynamicForm/types';

  const props = defineProps({
    /** 表单字段列表 */
    field: {
      type: Array as PropType<FieldType[]>,
      default: [],
    },
    /** 表单动态 Model */
    // dynamicModel: {
    //   type: Object as any,
    //   default: {},
    // },
  });

  // const { field, dynamicModel } = props;
  const { field } = props;
  const dynamicModel: any = inject(formInjectionKey);
  console.table(field);
  console.log(dynamicModel);
</script>

<template>
  <!-- Render components -->
  <!-- https://blog.csdn.net/li_jia_h/article/details/123925787 -->
  <!-- [Vue warn]: Extraneous non-props attributes (dynamic-model) were passed to component but
    could not be automatically inherited because component renders fragment or text root nodes.  -->
  <div>
    <ElFormItem
      v-for="(item, index) in field"
      :key="`${item.prop}_${index}`"
      :label="item.label"
      :prop="`${item.prop}`"
    >
      <ElInput
        v-if="item.control === 'Input'"
        v-model.number="dynamicModel[`${item.prop}`]"
      />
      <ElSwitch
        v-else-if="item.control === 'Switch'"
        v-model="dynamicModel[`${item.prop}`]"
      />
      <ElSelect
        v-else-if="item.control === 'Select'"
        v-model="dynamicModel[`${item.prop}`]"
      >
        <ElOption
          v-for="opt in item.options"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        />
      </ElSelect>
      <ElCheckbox
        v-else-if="item.control === 'Checkbox'"
        v-model="dynamicModel[`${item.prop}`]"
        :label="item?.props?.label"
      />

      <!-- 自定义组件 Slot -->
      <slot
        v-else-if="item.control === 'Slots'"
        :name="item.prop"
        :formModel="dynamicModel"
      />
    </ElFormItem>
  </div>
</template>
