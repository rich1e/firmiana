<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-03 14:10:27
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-01 15:10:05
 * @FilePath: /vue-form/src/components/Layouts/BaseView.vue
 * @Description:
 *
-->
<template>
  <div class="container">
    <div class="header-bar">
      <h1>
        <slot name="header" />
      </h1>
    </div>
    <div class="content-main">
      <slot name="main" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .header-bar {
    height: 100%;
    width: 300px;

    h1 {
      padding: 0 20px;
    }
  }
  .content-main {
    flex: 1;
    // height: 100%;
    overflow-y: scroll;
    text-align: left;

    // https://developer.mozilla.org/zh-CN/docs/Web/CSS/::-webkit-scrollbar
    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
