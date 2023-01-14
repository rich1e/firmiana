<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2023-01-10 16:54:38
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-10 18:32:56
 * @FilePath: /vue-form/src/example/dialog/components/Button.vue
 * @Description:
 *
-->

<script lang="ts">
  export default {
    name: 'FiButton',
    /**
     * 默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings)
     * 将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。
     * 当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。
     * 通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。
     * @see https://juejin.cn/post/7046282409767092237
     */
    inheritAttrs: false,
  };
</script>

<script setup lang="ts">
  import { ElButton } from 'element-plus';
</script>

<template>
  <ElButton v-bind="$attrs" />
</template>
