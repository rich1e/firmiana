<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-18 14:23:17
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-06 15:49:28
 * @FilePath: /vue-form/src/example/getCurrentInstance/index.vue
 * @Description:
 *
-->
<script lang="ts">
  export default {
    name: 'GetCurrentInstance',
  };
</script>

<script setup lang="ts">
  import { ElButton, ElDivider } from 'element-plus';
  import Father from './father.vue';

  const onClick = () => {
    console.log('click');
  };
</script>

<template>
  <div>
    <ElButton @click="onClick">OK</ElButton>
    <ElDivider>Index</ElDivider>
    <Father />
  </div>
</template>
