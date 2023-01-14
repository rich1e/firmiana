<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-12-19 18:32:14
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-20 16:18:08
 * @FilePath: /vue-form/src/components/DynamicForm/src/templates/UniseriateTemplate.vue
 * @Description:
 *
-->
<script lang="ts">
  /**
   * @see https://github.com/vuejs/rfcs/discussions/273
   * @see https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md#automatic-name-inference
   */
  export default { name: 'UniseriateTemplate' };
</script>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import { reactive, ref } from 'vue';
  import { ElForm, ElRow, ElCol } from 'element-plus';

  import FormFields from '../components/FormFields.vue';
  import FormActions from '../components/FormActions.vue';

  import type { ConfigType } from '../../types';
  import useDynamicSlots from '../hooks/useDynamicSlots';
  import {
    getColSpan,
    getGroupByEntries,
    getGutter,
  } from '../hooks/useMultiColumn';

  const props = defineProps({
    config: {
      type: Object as PropType<ConfigType>,
      default: {},
    },
  });

  const { scene, field, actions, rule, multiColumn } = props.config;

  const state = reactive<{
    fieldGroups: any[][];
    colSpan: number;
    rowGutter: number;
  }>({
    fieldGroups: [],
    colSpan: 0,
    rowGutter: 20,
  });

  // 表单引用
  const formRef = ref<InstanceType<typeof ElForm> | null | any>(null);

  // 动态表单字段
  const dynamicFormModel: any = reactive({});

  // 获取动态 slots
  const { slots } = useDynamicSlots({ field });

  // 自定义多列
  if (multiColumn) {
    const { cols, gutter } = multiColumn;
    state.fieldGroups = getGroupByEntries(field!, cols);
    state.colSpan = getColSpan(cols);
    state.rowGutter = getGutter(gutter!);
  }
</script>

<template>
  <!-- 渲染表单 -->
  <ElForm
    ref="formRef"
    label-width="80px"
    :model="dynamicFormModel"
    :rules="rule"
  >
    <!-- 单列 -->
    <template v-if="!multiColumn">
      <FormFields
        :scene="scene"
        :field="field"
        :dynamic-model="dynamicFormModel"
      >
        <!-- 渲染自定义字段 -->
        <template
          #[item]="{ formModel }"
          v-for="(item, idx) in slots"
          :key="`${item}_${idx}`"
        >
          <slot :name="item" :slotModel="formModel" />
        </template>
      </FormFields>
    </template>

    <!-- 自定义多列 -->
    <template v-else>
      <ElRow
        :gutter="state.rowGutter"
        v-for="(group, idxGroup) in state.fieldGroups"
        :key="`row_${idxGroup}`"
      >
        <ElCol
          :span="state.colSpan"
          v-for="(col, idxCol) in group"
          :key="`col_${idxCol}`"
        >
          <FormFields
            :scene="scene"
            :field="[col]"
            :dynamic-model="dynamicFormModel"
          >
            <!-- 渲染自定义字段 -->
            <template
              #[item]="{ formModel }"
              v-for="(item, idx) in slots"
              :key="`${item}_${idx}`"
            >
              <slot :name="item" :slotModel="formModel" />
            </template>
          </FormFields>
        </ElCol>
      </ElRow>
    </template>

    <!-- 渲染操作按钮 -->
    <FormActions :scene="scene" :actions="actions" />
  </ElForm>
</template>
