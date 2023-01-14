<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-11 09:39:28
 * @LastEditors: rich1e
 * @LastEditTime: 2022-12-04 17:39:41
 * @FilePath: /vue-form/src/components/DynamicForm/src/components/FormGroup.vue
 * @Description:
 *
-->
<script lang="ts">
  /**
   * @see https://github.com/vuejs/rfcs/discussions/273
   * @see https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md#automatic-name-inference
   */
  export default { name: 'FormGroup' };
</script>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import { reactive, ref } from 'vue';
  import { ElForm } from 'element-plus';

  import { FieldType } from '../../types';

  const props = defineProps({
    /** 表单规则 */
    rule: {
      type: Object as any,
      default: {},
    },
    /** 表单队列 */
    groups: {
      type: Object as PropType<FieldType[][]>,
      default: [],
    },
  });

  const { groups, rule } = props;

  /** 表单引用 */
  const formRef = ref<InstanceType<typeof ElForm> | null | any>(null);

  /** 动态表单字段 */
  const dynamicFormModel: any = reactive({});
</script>

<template>
  <!-- TODO label-width="80px" -->
  <ElForm
    :model="dynamicFormModel"
    ref="formRef"
    :rules="rule"
    label-width="80px"
  >
    <!-- TODO Field 循环调用 -->
    <div
      class="cust-group"
      v-for="(rank, idx) in groups"
      :key="`${rank}_${idx}`"
    >
      <!-- 渲染表单字段 -->
      <slot :rank="rank" :dynamicModel="dynamicFormModel" />
    </div>

    <!-- 渲染操作按钮 -->
    <slot name="actions" />
  </ElForm>
</template>

<style lang="scss" scoped>
  .cust-group {
    border: 1px solid #e3e3e3;
    margin-bottom: 15px;
    padding: 20px;
  }
</style>
