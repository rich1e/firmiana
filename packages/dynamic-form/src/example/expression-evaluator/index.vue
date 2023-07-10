<!--
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-06-02 18:17:14
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-06 20:02:01
-->

<script setup lang="ts">
  import { ref, reactive, nextTick } from 'vue';
  import type { Ref } from 'vue';

  import Dialog from './dialog.vue';
  import Candidate from './candidate.vue';

  import type { Keywords } from './types';

  import { useSetGlobal } from './use-set-global';

  const {
    reset,
    clean,
    addGlobal,
    globals,
    inputVal,
    defaultMap,
    evalWithParser,
  } = useSetGlobal();

  const msg = 'Expression Evaluator';

  const inputExpr = ref('');
  const inputExprCache = reactive({ expr: '', val: '' });

  const showModal: Ref<boolean> = ref(false);
  const showCandidate: Ref<boolean> = ref(false);
  const candidate: Ref<any[]> = ref([]);
  const candidateTarget: Ref<any> = ref(null);
  const candidateKey: Ref<string> = ref('');
  const candidateExpr: Ref<string> = ref('');

  /**
   * 输入框失焦的时候，计算表达式，并显示结果
   * @event blur
   * @param evt
   */
  const onBlurHandler = async (evt: Event) => {
    console.log('onBlurHandler', showCandidate.value);

    let ret;
    const target = evt.target as HTMLInputElement;
    const expr = target.value;

    // 关闭输入联想

    await nextTick();
    showCandidate.value = false;
    console.log('onBlurHandler', showCandidate.value);

    /**
     * @see https://juejin.cn/post/7104448863297077284
     */
    try {
      // 没有弹出候选词
      if (!showCandidate.value) {
        ret = evalWithParser.computed(expr);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // 如果有结果
      if (ret !== undefined && ret !== null) {
        inputExpr.value = ret;
        inputExprCache.val = ret;
        inputExprCache.expr = expr;
      } else {
        inputExpr.value = expr;
        inputExprCache.expr = expr;
      }
    }
  };

  /**
   * 获取光标后，显示表达式；
   * 如果输入框不为空，查询输入内容，并显示搜索结果
   * @event focus
   * @param evt
   */
  const onFocusHandler = (evt: Event) => {
    console.log('onFocusHandler', inputExpr.value);
    const target = evt.target as HTMLInputElement;

    // 显示表达式
    inputExpr.value = inputExprCache.expr;

    /**
     * 配置候选词弹窗
     */
    candidate.value = defaultMap; // 设置全局变量 & 函数
    candidateTarget.value = target; // 传递输入框
    candidateExpr.value = inputExpr.value; // 输入框内容
    candidateKey.value = ''; // 当前输入内容

    if (inputExpr.value !== '') {
      // 显示输入联想
      showCandidate.value = true;
    } else {
      showCandidate.value = false;
    }
  };

  /**
   * 输入时，根据输入内容，显示搜索结果
   * @event Input
   * @event KeyUp
   * @param evt
   * @see https://www.jianshu.com/p/a1d611e30350
   * @see https://www.jianshu.com/p/8f839f558319
   */
  const autoComplete = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    const expr = target.value;

    if (evt.type === 'input') {
      const inputEvent = evt as InputEvent;
      suggestions({
        key: inputEvent.data!,
        code: '',
        expr,
        target,
      });
    } else if (evt.type === 'keyup') {
      const keyboardEvent = evt as KeyboardEvent;
      suggestions({
        key: keyboardEvent.key,
        code: keyboardEvent.keyCode + '',
        expr,
        target,
      });
    }
    // inputExpr.value = target.value; // 赋值
    // console.log(evt.keyCode);
    // console.log(expr);
    // console.log(evt.key);
    inputExprCache.expr = expr;
  };

  const suggestions = (keywords: Keywords) => {
    console.log('suggestions', keywords);
    const { key, expr, target } = keywords;

    /**
     * 配置候选词弹窗
     */
    candidate.value = defaultMap; // 设置全局变量 & 函数
    candidateTarget.value = target; // 传递输入框
    candidateExpr.value = expr; // 输入框内容
    candidateKey.value = key; // 当前输入内容

    // if (key !== '' && expr !== '') {
    //   // 显示输入联想
    //   showCandidate.value = true;
    // } else {
    //   showCandidate.value = false;
    // }
  };

  /**
   * 拼接字符串
   * // TODO
   * @param str
   * @param newChar
   * @param index
   */
  const stringReplace = (str: string, newChar: string, index: number) => {
    return index > 0
      ? str.substring(0, index) + newChar + str.substring(index + 1)
      : str.substring(0, index) + newChar;
  };

  const onSelectItem = (item: any) => {
    console.log(item);
    const { name } = item;
    const index = inputExpr.value.lastIndexOf(name);

    // 拼接选中的内容
    inputExpr.value = stringReplace(inputExpr.value, name, index);
    // 缓存输入内容
    inputExprCache.expr = inputExpr.value;
    showCandidate.value = false;
  };
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="global">
    <div class="add-global">
      <label for="key">key:</label>
      <input type="text" id="key" v-model="inputVal.key" />
      <label for="val">value:</label>
      <input type="text" id="val" v-model="inputVal.val" />
      <button @click="addGlobal">add</button>
      <button @click="clean">clean</button>
      <button @click="reset">reset</button>
    </div>

    <div class="global-list">
      <p v-for="item in globals">
        <span> {{ item.key }} - {{ item.val }} </span>
      </p>
    </div>

    <hr />

    <label for="exp">表达式计算：</label>
    <input
      type="text"
      id="exp"
      v-model="inputExpr"
      @blur="onBlurHandler"
      @focus="onFocusHandler"
      @input="autoComplete"
    />
    <hr />
  </div>

  <Teleport to="body">
    <Candidate
      :show="showCandidate"
      :candidate="candidate"
      :target-elem="candidateTarget"
      :content="candidateExpr"
      :keyword="candidateKey"
      @select-item="onSelectItem"
    />
  </Teleport>

  <Teleport to="body">
    <!-- 使用这个 modal 组件，传入 prop -->
    <Dialog :show="showModal" @close="showModal = false">
      <template #header>
        <h3>custom header</h3>
      </template>
    </Dialog>
  </Teleport>
</template>

<style scoped lang="scss">
  .global {
    label {
      margin-right: 5px;
    }

    input {
      margin-right: 5px;
    }

    button {
      margin-left: 10px;
    }
  }

  .global-list {
    height: 100px;
    overflow: auto;
  }

  .title {
    text-align: left;
  }

  .wrapper {
    display: flex;

    .expre-view {
      &:nth-child(2) {
        margin: auto 10px;
      }

      &--sub {
        height: 300px;
        padding: 5px;
        overflow: auto;
        text-align: left;
        border: 1px solid black;
      }

      pre {
        color: red;
      }

      p {
        color: red;
        white-space: nowrap;

        .err {
          background-color: aqua;
        }
      }
    }
  }

  .passive {
    height: 300px;
    padding: 5px;
    overflow: auto;
    color: red;
    text-align: left;
    border: 1px solid black;
  }
</style>
