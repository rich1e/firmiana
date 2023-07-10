<!--
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-04 09:43:29
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-04 09:50:11
-->
<script setup lang="ts">
  const props = defineProps({
    show: Boolean,
  });
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">default header</slot>
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            default footer
            <button class="modal-default-button" @click="$emit('close')">
              OK
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
  .modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9998;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
    transition: opacity 0.3s ease;
  }

  .modal-container {
    width: 300px;
    padding: 20px 30px;
    margin: auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 33%);
    transition: all 0.3s ease;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
 * 对于 transition="modal" 的元素来说
 * 当通过 Vue.js 切换它们的可见性时
 * 以下样式会被自动应用。
 *
 * 你可以简单地通过编辑这些样式
 * 来体验该模态框的过渡效果。
 */

  .modal-enter-from {
    opacity: 0;
  }

  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    transform: scale(1.1);
  }
</style>
