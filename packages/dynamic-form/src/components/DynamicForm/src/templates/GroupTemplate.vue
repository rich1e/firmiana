<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-11 09:39:28
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-20 17:09:04
 * @FilePath: /vue-form/src/components/DynamicForm/src/templates/GroupTemplate.vue
 * @Description:
 *
-->
<script lang="ts">
  /**
   * @see https://github.com/vuejs/rfcs/discussions/273
   * @see https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md#automatic-name-inference
   */
  export default { name: 'GroupTemplate' };
</script>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import { reactive } from 'vue';
  import { ElRow, ElCol } from 'element-plus';

  import FormGroup from '../components/FormGroup.vue';
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

  const { scene, groups, actions, rule, multiColumn } = props.config;

  const state = reactive<{
    fieldGroups: any[][];
    colSpan: number;
    rowGutter: number;
  }>({
    fieldGroups: [],
    colSpan: 0,
    rowGutter: 20,
  });

  // 获取动态 slots
  const { slots } = useDynamicSlots({ groups });

  if (multiColumn) {
    const { cols, gutter } = multiColumn;
    state.colSpan = getColSpan(cols);
    state.rowGutter = getGutter(gutter!);
  }
</script>

<template>
  <FormGroup :groups="groups" :rule="rule">
    <template #="{ rank, dynamicModel }">
      <!-- 单列 -->
      <template v-if="!multiColumn">
        <FormFields :scene="scene" :field="rank" :dynamic-model="dynamicModel">
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
          v-for="(group, idxGroup) in getGroupByEntries(rank, multiColumn!.cols)"
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
              :dynamic-model="dynamicModel"
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
    </template>

    <!-- 渲染操作按钮 -->
    <template #actions>
      <FormActions :scene="scene" :actions="actions" />
    </template>
  </FormGroup>
</template>
