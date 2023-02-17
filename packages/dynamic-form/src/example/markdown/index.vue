<!--
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-02-17 17:09:38
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-02-17 17:51:47
 * @FilePath     : /firmiana/packages/dynamic-form/src/example/markdown/index.vue
 * @Description  :
 *
-->
<script setup lang="ts">
  import README from './README.md';
  const title = ' Markdown';
</script>

<template>
  <h1>{{ title }}</h1>
  <div class="note">
    <README />
  </div>
</template>

<style scoped lang="scss">
  .note {
    height: calc(100% - 200px);
    margin-top: 20px;
    overflow: auto;
    text-align: left;
  }
</style>
