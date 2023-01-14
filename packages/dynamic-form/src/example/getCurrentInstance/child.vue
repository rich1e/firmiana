<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-18 14:23:17
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-21 14:30:59
 * @FilePath: /vue-form/src/example/getCurrentInstance/child.vue
 * @Description:
 *
-->
<script lang="ts">
  export default {
    name: 'Child',
  };
</script>

<script setup lang="ts">
  import { ElButton } from 'element-plus';
  import { getCurrentInstance } from 'vue';

  const childName = 'Child';
  const { proxy }: any = getCurrentInstance();

  const onClick = () => {
    console.log('Child');
    // TODO 在某些情况下 proxy 存在 $parent
    console.log('proxy is', proxy.$parent);
  };

  const getComponents = () => {
    return childName;
  };

  // 暴露自身方法
  defineExpose({
    getComponents,
  });
</script>

<template>
  <div>
    <ElButton @click="onClick">Child</ElButton>
  </div>
</template>
