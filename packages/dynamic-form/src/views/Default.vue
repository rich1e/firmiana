<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-07 10:35:55
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-11 10:58:31
 * @FilePath: /vue-form/src/views/Default.vue
 * @Description:
 *
-->
<template>
  <div class="page-list">
    <h2>Form</h2>
    <ul>
      <li>
        <RouterLink to="/uniseriate">Uniseriate</RouterLink>
      </li>
      <li>
        <RouterLink to="/biserial">Biserial</RouterLink>
      </li>
      <li>
        <RouterLink to="/group">Group</RouterLink>
      </li>
      <li>
        <RouterLink to="/tab">Tab</RouterLink>
      </li>
    </ul>
    <h2>Explore</h2>
    <ul>
      <li>
        <RouterLink to="/flex">Flex</RouterLink>
      </li>
      <li>
        <RouterLink to="/http">Http</RouterLink>
      </li>
      <li>
        <RouterLink to="/instance">getCurrentInstance</RouterLink>
      </li>
      <li>
        <RouterLink to="/jsx">Jsx</RouterLink>
      </li>
      <li>
        <RouterLink to="/form">Form</RouterLink>
      </li>
      <li>
        <RouterLink to="/jsx-form">JsxForm</RouterLink>
      </li>
      <li>
        <RouterLink to="/dynamic-components">Dynamic Components</RouterLink>
      </li>
      <li>
        <RouterLink to="/slots">Slots</RouterLink>
      </li>
      <li>
        <RouterLink to="/dialog">Dialog</RouterLink>
      </li>
      <li>
        <RouterLink to="/multi-column-form">Multi-Column Form</RouterLink>
      </li>
      <li>
        <RouterLink to="/table">Table</RouterLink>
      </li>
      <li>
        <RouterLink to="/typewriter">TypeWriter</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  .page-list {
    text-align: left;
  }
</style>
