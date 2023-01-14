<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-18 14:23:17
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-06 15:49:41
 * @FilePath: /vue-form/src/example/getCurrentInstance/father.vue
 * @Description:
 *
-->
<script lang="ts">
  export default {
    name: 'Father',
  };
</script>

<script setup lang="ts">
  import { ref } from 'vue';
  import { ElButton, ElDivider } from 'element-plus';
  import Child from './child.vue';

  const childName = 'Father';

  const refChild = ref<InstanceType<typeof Child> | null>(null);

  const onClick = () => {
    console.log('Father');
    console.log('refChild', refChild.value);
    console.log('getComponents for', getComponents());
  };

  const getComponents = () => {
    return childName;
  };
</script>

<template>
  <div>
    <ElButton @click="onClick">Father</ElButton>
    <ElDivider>Father - Child</ElDivider>
    <Child ref="refChild" />
    <ElDivider>Father - Component</ElDivider>
    <component :is="Child" />
  </div>
</template>
