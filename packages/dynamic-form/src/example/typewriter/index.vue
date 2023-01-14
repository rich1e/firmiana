<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2023-01-11 10:55:34
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-11 15:10:07
 * @FilePath: /vue-form/src/example/typewriter/index.vue
 * @Description:
 *
-->
<script setup lang="ts">
  /**
   * @see https://bbs.huaweicloud.com/blogs/351145
   */
  import { onMounted, ref, watch } from 'vue';

  const text = ref(`Web Developer`);
  const animatedText = ref('');
  const count = ref(0);
  const sloganText = "Welcome to Hamsterism, Eide's \n Blog!";

  /**
   * @see https://hamsterism.com/articles/wrapable-typing-animation/
   */
  const typeWriter = () => {
    const speed = 50;
    if (count.value < sloganText.length) {
      animatedText.value += sloganText.charAt(count.value);
      count.value += 1;
      setTimeout(typeWriter, speed);
    }
  };

  watch(
    () => animatedText.value,
    (newVal) => {
      console.log(newVal);
      if (newVal === sloganText) {
        setTimeout(() => {
          //注意這裡必須使用arrow function才能讓this被正確指向
          count.value = 0;
          animatedText.value = '';
          typeWriter();
        }, 1000);
      }
    },
  );

  onMounted(() => {
    setTimeout(() => typeWriter(), 1000);
  });

  // setTimeout(() => {
  //   text.value = '';
  //   text.value = 'Test';
  // }, 5e3);
</script>

<template>
  <h1 class="type-writer">{{ animatedText }}<span id="caret">&nbsp;</span></h1>
  <div>
    <div class="container">
      <div class="typed-out">{{ text }}</div>
      <!-- <textarea class="typed-out" v-model="text" /> -->
    </div>
  </div>
  <!-- <div class="scanner">
    <div>Ladies and Gentlemen,</div>
    <div>欢迎来到技术控老李直播间</div>
    <div>视频号：技术控老李</div>
  </div> -->
</template>

<style scoped lang="scss">
  body {
    background: navajowhite;
    background-size: cover;
    font-family: 'Trebuchet MS', sans-serif;
  }
  .container {
    display: inline-block;
  }
  .typed-out {
    overflow: hidden;
    border-right: 0.15em solid orange;
    white-space: nowrap;
    animation: typing 1s steps(20, end) forwards, blink 1s infinite;
    font-size: 1.6rem;
    width: 0;
  }
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  @keyframes blink {
    from {
      border-color: transparent;
    }
    to {
      border-color: orange;
    }
  }

  .scanner {
    --font-color: #ffffff;
    --font-bgcolor: #333;
    --font-size: 20px;
    --animation-duration: 5s;
    --animation-iteration: 1;
    --img-background: linear-gradient(#000, #000);
    display: inline-block;
    background-color: var(--font-bgcolor);
    background-image: var(--img-background);
    background-size: 100% 100%;
    color: #000;
  }
  .scanner div {
    position: relative;
    display: block;
    margin: 0px calc(0.5 * var(--font-size));
    height: calc(var(--font-size) * 1.5);
    line-height: calc(var(--font-size) * 1.5);
    font-size: var(--font-size);
    font-weight: bold;
    background-clip: content-box;
    -webkit-text-fill-color: transparent;
    background-color: var(--font-bgcolor);
    background-image: linear-gradient(var(--font-color), var(--font-color));
    background-size: 0% 100%;
    background-repeat: no-repeat;
    animation: printing var(--animation-duration) linear
      var(--animation-iteration);
    animation-fill-mode: forwards;
  }
  .scanner div:nth-child(1) {
    animation-delay: 0;
  }
  .scanner div:nth-child(2) {
    animation-delay: var(--animation-duration);
  }
  .scanner div:nth-child(3) {
    animation-delay: calc(2 * var(--animation-duration));
  }
  .scanner div:nth-child(4) {
    animation-delay: calc(3 * var(--animation-duration));
  }
  .scanner div:nth-child(5) {
    animation-delay: calc(4 * var(--animation-duration));
  }
  .scanner div:nth-child(6) {
    animation-delay: calc(5 * var(--animation-duration));
  }
  .scanner div:nth-child(7) {
    animation-delay: calc(6 * var(--animation-duration));
  }
  .scanner div:nth-child(8) {
    animation-delay: calc(7 * var(--animation-duration));
  }
  .scanner div:nth-child(9) {
    animation-delay: calc(8 * var(--animation-duration));
  }
  .scanner div:nth-child(10) {
    animation-delay: calc(9 * var(--animation-duration));
  }

  @keyframes printing {
    0% {
      background-size: 0% 100%;
    }
    100% {
      background-size: 100% 100%;
    }
  }

  .type-writer {
    // width: 300px;
    margin: 0 auto;
    /**
     * @see https://blog.csdn.net/qq_44812132/article/details/105008067
     */
    white-space: pre-line;
  }

  #caret {
    border-left: 5px solid orange;
    margin-left: 3px;
    animation: blink-caret 1s infinite;
  }

  @keyframes blink-caret {
    from {
      border-color: transparent;
    }
    to {
      border-color: orange;
    }
  }
</style>
