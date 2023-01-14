<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-24 13:48:57
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-24 14:13:55
 * @FilePath: /vue-form/src/example/jsx/components/CustInput/index.vue
 * @Description:
 *
-->
<script setup lang="ts">
  import { toRefs } from 'vue';

  const props = defineProps(['modelValue']);
  const emits = defineEmits(['update:modelValue']);

  /**
   * @see https://cn.vuejs.org/guide/components/events.html#usage-with-v-model
   */

  const { modelValue } = toRefs(props);

  const onInput = ($event: any) => {
    console.log('onInput', $event.target.value);
    emits('update:modelValue', $event.target.value);
  };
</script>

<template>
  <input :value="modelValue" @input="onInput" />
</template>
