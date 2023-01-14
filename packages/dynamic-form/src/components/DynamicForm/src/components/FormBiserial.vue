<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-11 09:39:28
 * @LastEditors: rich1e
 * @LastEditTime: 2022-12-04 17:37:34
 * @FilePath: /vue-form/src/components/DynamicForm/src/components/FormBiserial.vue
 * @Description:
 *
-->
<script lang="ts">
  /**
   * @see https://github.com/vuejs/rfcs/discussions/273
   * @see https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md#automatic-name-inference
   */
  export default { name: 'FormBiserial' };
</script>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import { inject, reactive } from 'vue';
  import { ElCol, ElForm, ElRow } from 'element-plus';

  import type { FieldType } from '../../types';

  const props = defineProps({
    /** 表单规则 */
    rule: {
      type: Object as any,
      default: {},
    },
    /** 表单字段 */
    field: {
      type: Object as PropType<FieldType[]>,
      default: {},
    },
  });

  const { field, rule } = props;
  const injectRef = inject('FORM_REF');

  /** 动态表单字段 */
  const dynamicFormModel: any = reactive({});
</script>

<template>
  <ElForm
    :model="dynamicFormModel"
    ref="injectRef"
    :rules="rule"
    label-width="80px"
  >
    <!-- TODO ElRow 默认会添加 margin 值，手动设置后可以覆盖默认行为 -->
    <ElRow
      :gutter="20"
      align="middle"
      justify="space-between"
      :style="{ margin: 0 }"
    >
      <!-- 渲染表单字段 -->
      <ElCol
        :span="12"
        v-for="(item, index) in field"
        :key="`${item.prop}_${index}`"
      >
        <slot :field="item" :dynamicModel="dynamicFormModel" />
      </ElCol>

      <!-- 渲染操作按钮 -->
      <ElCol :span="24">
        <slot name="actions" />
      </ElCol>
    </ElRow>
  </ElForm>
</template>
