<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-07 18:19:40
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-07 19:05:39
 * @FilePath: /vue-form/src/views/Flex.vue
 * @Description:
 *
-->
<template>
  <div class="box">
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
    </ul>
  </div>

  <div class="box2">
    <ul>
      <li>
        <span>label</span>
        <div><input type="text" /></div>
      </li>
      <li>
        <span>label</span>
        <div><input type="text" /></div>
      </li>
      <li>
        <span>label</span>
        <div><input type="text" /></div>
      </li>
      <li>
        <span>label</span>
        <div><input type="text" /></div>
      </li>
      <li>
        <span>label</span>
        <div><input type="text" /></div>
      </li>
      <li>
        <span>label</span>
        <div><input type="text" /></div>
      </li>
      <li>
        <span>label</span>
        <div><input type="text" /></div>
      </li>
      <li>
        <span>label</span>
        <div><input type="text" /></div>
      </li>
      <li>
        <span>label</span>
        <div><input type="text" /></div>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  // https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
  .box {
    border: 1px dashed #ccc;
    width: 100%;

    margin-bottom: 10px;

    ul {
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      padding: 0;
      margin: 0;

      li {
        display: block;
        padding: 15px;
        color: white;
        font-size: 13px;
        background-color: #18e8e8;
      }
    }
  }
  .box2 {
    border: 1px dashed #ccc;
    width: 100%;

    ul {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      padding: 0;
      margin: 0;

      li {
        display: inline-flex;
        flex-basis: 50%;
        color: white;
        font-size: 13px;
        background-color: #18e8e8;
      }
    }
  }
</style>
