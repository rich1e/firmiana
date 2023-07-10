<!--
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-06-20 15:31:26
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-06-20 15:44:05
-->
<script setup lang="ts">
  import onChange from 'on-change';

  const msg = 'Watch an Object';

  const user = {
    firstName: 'Chris',
    lastName: 'Bongers',
    age: 10,
  };

  const watched = onChange(user, (path, value, previousValue, applyData) => {
    console.log(path, value, previousValue, applyData);
  });

  watched.age = 15;
</script>

<template>
  <h1>{{ msg }}</h1>
</template>
