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
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .header-bar {
    width: 300px;
    height: 100%;

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
