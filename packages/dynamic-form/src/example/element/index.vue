<!--
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-03-01 09:41:20
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-03-01 15:44:25
 * @FilePath     : /firmiana/packages/dynamic-form/src/example/element/index.vue
 * @Description  : 
 * 
-->
<script setup lang="ts">
  import { ref } from 'vue';

  import { XButton } from './src/index';
  import { FButton } from './src/button';
  import { FInput } from './src/input';

  const onClick = () => {
    console.log('hello');
  };

  const numVal = ref('');
</script>

<template>
  <XButton type="primary" :shadow="true">JSX/TSX</XButton>
  <FButton type="primary" :circle="true" @click="onClick" :hidden="true">
    h()
  </FButton>
  <FInput v-model="numVal" />
  <p>{{ numVal }}</p>
</template>
