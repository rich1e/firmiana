<!--
 * @Author: rich1e
 * @Date: 2022-11-14 12:37:25
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-02 17:49:17
-->
<script lang="ts">
  export default {
    name: 'FormFields',
  };
</script>

<script setup lang="ts">
  import type { PropType, ComputedRef } from 'vue';
  import { computed } from 'vue';
  import {
    ElFormItem,
    ElInput,
    ElSwitch,
    ElSelect,
    ElOption,
    ElCheckbox,
  } from 'element-plus';

  import { FieldType, SceneType } from '../../types';

  const props = defineProps({
    /** 表单UI类型 */
    scene: {
      type: String as PropType<SceneType>,
      default: '',
    },
    /** 单个表单字段 */
    item: {
      type: Object as PropType<FieldType>,
      default: {},
    },
    /** 表单字段列表 */
    field: {
      type: Array as PropType<FieldType[]>,
      default: [],
    },
    /** 表单动态 Model */
    dynamicModel: {
      type: Object as any,
      default: {},
    },
  });

  const { scene, field, item, dynamicModel } = props;

  const isNotBiserial: ComputedRef = computed(() => {
    return scene !== 'biserial' && field;
  });
</script>

<template>
  <!-- Render multiple -->
  <template v-if="isNotBiserial">
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
  </template>

  <!-- Render single -->
  <template v-else>
    <ElFormItem :label="item.label" :prop="`${item.prop}`">
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

      <!-- 自定义组件 Slot -->
      <slot
        v-else-if="item.control === 'Slots'"
        :name="item.prop"
        :formModel="dynamicModel"
      />
    </ElFormItem>
  </template>

  <!-- TODO FormFields 异常逻辑 -->
</template>
