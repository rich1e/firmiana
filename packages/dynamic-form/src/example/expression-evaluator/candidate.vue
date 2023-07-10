<!--
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-04 10:02:17
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-06 20:03:35
-->

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { PropType, Ref } from 'vue';

  /**
   * 输入联想功能
   * - 候选列表定位
   * - 候选列表查询和排序，包含变量和函数
   * - 候选列表支持按键操作
   *
   * @see https://medium.com/primetek/vue3-autocomplete-b3f79efe589b
   * @see https://stevencotterill.com/articles/how-to-build-an-autocomplete-field-with-vue-3
   * @see https://github.com/stevie-c91/vue-3-autocomplete/blob/master/src/App.vue
   * @see https://medium.com/@fareez_ahamed/make-your-own-autocomplete-component-quickly-using-vue-js-21a642e8b140
   * @see https://github.com/jsuites/jsuites/blob/master/src/plugins/dropdown.js
   * @see https://www.w3schools.com/howto/howto_js_autocomplete.asp
   */

  type StyleType = {
    top: string;
    left: string;
    height: string;
    width: string;
  };

  const props = defineProps({
    modelValue: Boolean,
    show: Boolean,
    test: Boolean,
    keyword: String,
    content: String,
    candidate: Array,
    targetElem: Object as PropType<HTMLElement>,
  });

  const emit = defineEmits<{
    (event: 'selectItem', item: any): void;
  }>();

  const candidateStyle: Ref<StyleType> = ref({
    top: '',
    left: '',
    height: '',
    width: '',
  });

  const candidateResult: Ref<any[]> = ref([]);
  const isShowCandidate = ref(false);
  const isCreate = ref(false);

  /**
   * 设置位置
   * @param elem
   */
  const setPosition = (elem: HTMLElement) => {
    // getBoundingClientRect
    const { offsetHeight, offsetWidth, offsetTop, offsetLeft } = elem;
    const calcTop = offsetTop + offsetHeight;
    candidateStyle.value = {
      top: `${calcTop}px`,
      left: `${offsetLeft}px`,
      height: `${offsetHeight}px`,
      width: `${offsetWidth}px`,
    };
  };

  /**
   * 查找最近的keword
   * @param expr
   */
  const findLatestKeyword = (expr: string) => {
    const operators = [];
    const regex = /[+\-*/]/g;
    let match;

    while ((match = regex.exec(expr)) !== null) {
      operators.push({
        operator: match[0],
        index: match.index,
      });
    }

    const lenMax = operators.length - 1;
    const { index } = operators[lenMax];
    const latest = expr.slice(index + 1);

    return latest;
  };

  /**
   * 检索分词
   * @param keyword
   * @param expr
   */
  const expressionAnalysis = (keyword: string, expr: string) => {
    // console.log(keyword);
    // console.log(expr);
    if (expr.length === 1 && /\D/.test(expr)) {
      search(expr);
    } else {
      const isOperator = /\+|\-|\*|\//;
      if (!isOperator.test(expr)) {
        search(expr);
      } else {
        const latestKeyword = findLatestKeyword(expr);
        search(latestKeyword);
      }
    }
  };

  /**
   * 首字母排序
   * @see http://www.zuo11.com/blog/2020/12/js_chinese_sort.html
   * @see https://www.cnblogs.com/echohye/p/17056746.html
   */
  const sort = (orig: any[]) => {
    // 变量
    const variableList = orig
      .filter((item) => item.type === 0)
      .sort((a, b) => a['name'].localeCompare(b['name']));
    // 方法
    const methodList = orig
      .filter((item) => item.type === 1)
      .sort((a, b) => a['name'].localeCompare(b['name']));

    return variableList.concat(methodList);
  };

  /**
   * 查询关键字
   * @param keyword
   */
  const search = (keyword: string) => {
    const isOperator = /\+|\-|\*|\//;

    // 如果关键词为空，或者不合法，关闭弹层
    if (!keyword || isOperator.test(keyword)) {
      isShowCandidate.value = false;
      return;
    }

    /**
     * @see https://masteringjs.io/tutorials/fundamentals/regexp-starts-with
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions
     */
    const reg = new RegExp(`^${keyword}`);
    const searchResult: any = props.candidate?.filter((item: any) => {
      if (reg.test(item.name)) {
        return item;
      }
    });

    // console.log(searchResult);
    candidateResult.value = sort(searchResult);

    // 如果有结果则显示，反之隐藏
    isShowCandidate.value = !!searchResult.length;
  };

  const selectItem = (item: any) => {
    console.log('selectItem');
    emit('selectItem', item);
    // 关闭输入联想
    isShowCandidate.value = false;
  };

  watch(
    () => props.show,
    (newVal, oldVal) => {
      console.log('props.show', newVal);
      if (newVal !== oldVal) {
        // console.log(isShowCandidate.value);
        isShowCandidate.value = newVal;
      }
    },
  );

  watch(
    () => props.targetElem,
    (newVal, oldVal) => {
      if (newVal && newVal !== oldVal) {
        setPosition(newVal);
      }
    },
  );

  watch(
    () => [props.keyword, props.content],
    (newVal: any[]) => {
      console.log('props.keyword');
      if (newVal && newVal.length > 0) {
        const [keyword, expr] = newVal;
        expressionAnalysis(keyword, expr);
      }
    },
  );
</script>

<template>
  <Transition name="candidate">
    <div v-if="isShowCandidate" class="candidate-mask" :style="candidateStyle">
      <div class="candidate-container">
        <ul v-if="!isCreate">
          <li v-for="item in candidateResult" @click="selectItem(item)">
            {{ (item as any).name }}
          </li>
        </ul>
        <p v-else>Create a new variable</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
  .candidate-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9998;
    display: flex;
  }

  .candidate-container {
    width: 100%;
    margin: auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 33%);
    transition: all 0.3s ease;

    ul {
      height: 160px;
      padding: 0;
      margin: 0;
      overflow-y: auto;
      line-height: 2;
      text-indent: 1em;
      list-style: none;
    }

    li {
      &:hover {
        background-color: #e9e9e9;
      }
    }
  }

  .candidate-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .candidate-body {
    margin: 20px 0;
  }

  .candidate-default-button {
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

  .candidate-enter-from {
    opacity: 0;
  }

  .candidate-leave-to {
    opacity: 0;
  }

  .candidate-enter-from .candidate-container,
  .candidate-leave-to .candidate-container {
    transform: scale(1.1);
  }
</style>
