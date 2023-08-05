/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-28 13:32:41
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-28 18:14:25
 */
/**
 * css module处理方案
 * @see https://www.jianshu.com/p/be1778a76763
 */

/**
 * Autocomplete Input
 * @see https://www.w3schools.com/howto/howto_js_autocomplete.asp
 */

import { defineComponent, nextTick, reactive, ref, Teleport } from 'vue';
import { createNamespace } from '@firmiana/utils';

import type { VNodeRef } from 'vue';
import type { CandidateProps } from '../types';

import { inputExpressionProps } from './composables/use-props';
import { useInputExpressionExpose } from './composables/use-expose';
import { useGlobalEvaluator } from './composables/use-global-evaluator';

import Candidate from './components/Candidate';
import { renderInputIcon } from './components/Icon';

import styles from './index.module.scss';

/**
 * 表达式输入框
 * - 支持单位转换
 * - 支持科学记数法
 * - 支持变量/函数下拉提示
 * - 支持浮层提示
 * - 支持全局单位
 * - 支持弹窗编辑表达式
 * - 支持创建新变量
 */
export default defineComponent({
  name: 'FirInputExpression',
  inheritAttrs: false,
  props: inputExpressionProps(),
  emits: ['trigger:watch'],
  setup(props, { attrs, expose, emit }) {
    const { bemCSSModule } = createNamespace('input-expression', styles);

    /**
     * 组件的引用
     * @see https://cn.vuejs.org/guide/typescript/composition-api.html#typing-template-refs
     * @see https://cn.vuejs.org/api/built-in-special-attributes.html#ref
     */
    const inputRef = ref<HTMLInputElement | VNodeRef | null>(null);

    const inputVal = ref(props.modelValue);
    const inputCache = reactive({ expr: '', val: '' });

    const candidateRef = ref<HTMLInputElement | VNodeRef | null>(null);
    const candidate = reactive<CandidateProps>({
      expression: '',
      shortlist: [],
      targetElem: null,
      // keystroke: '',
      focus: false,
    });

    /**
     * @description input 错误警告
     */
    const setErrorStyle = ref(true);

    const { gevaluator, mock } = useGlobalEvaluator();

    // TODO inputExpression disabled
    if (props.disabled) {
      console.log(props.disabled);
    }

    /**
     * 计算表达式
     * @param expr
     */
    const expressionComputed = (expr: string) => {
      console.log('expressionComputed');

      let ret;
      const isValid = /(?:^[+/*]|(?:[+\-*/]$))/;

      // 字符串前面或者后面出现运算符
      if (isValid.test(expr)) {
        setErrorStyle.value = false;
        return;
      }

      /**
       * @see https://juejin.cn/post/7104448863297077284
       */
      try {
        // FIXME 检查表达式合法性
        ret = gevaluator.computed(expr);
      } catch (error) {
        console.log(error);
      } finally {
        // 如果有结果
        if (ret !== undefined && ret !== null) {
          inputVal.value = ret;
          inputCache.val = ret;
          inputCache.expr = expr;
        } else {
          inputVal.value = expr;
          inputCache.expr = expr;
          setErrorStyle.value = false;
        }
      }
    };

    /**
     * 输入框失焦的时候，计算表达式，并显示结果
     * @event blur
     * @param evt
     */
    const onBlurHandler = async (evt: Event) => {
      const target = evt.target as HTMLInputElement;
      // console.log('onFocusHandler:target.value', target.value);
      // console.log('onBlurHandler:inputCache.expr', inputCache.expr);

      // 失焦时且内容为空，输入框标红
      setErrorStyle.value = target.value !== '';

      candidate.focus = false;
      // 计算表达式
      expressionComputed(inputCache.expr);
      emit('trigger:watch', target.value);
    };

    /**
     * 获取光标后，显示表达式；
     * 如果输入框不为空，查询输入内容，并显示搜索结果
     * @event focus
     * @param evt
     */
    const onFocusHandler = async (evt: Event) => {
      const target = evt.target as HTMLInputElement;
      // console.log('onFocusHandler:target.value', target.value);
      // console.log('onFocusHandler:inputCache.expr', inputCache.expr);

      if (inputCache.expr) {
        inputVal.value = inputCache.expr;
      }

      // 选中输入内容
      await nextTick();
      target.select();

      candidate.focus = true;
    };

    /**
     * 连续输入时，根据输入内容，显示搜索结果
     * @event input
     * @param evt
     */
    const onInputHandler = (evt: Event) => {
      const target = evt.target as HTMLInputElement;
      // console.log('onInputHandler', target.value);

      if (target.value) {
        setErrorStyle.value = true;

        // 如果当前输入的值与上一次的值相同，
        // 因为值未发生变化，触发不了 props.expression 的watch函数，需主动打开候选列表
        if (target.value === inputCache.expr) {
          candidateRef.value.open();
        }
      }

      inputCache.expr = target.value;

      candidate.shortlist = mock(); // 设置全局变量 & 函数
      candidate.targetElem = target; // 传递输入框
      candidate.expression = target.value; // 输入框内容
    };

    /**
     * 将单词替换输入框中的表达式
     * @param expression
     * @param word
     * @returns
     * @todo 待逻辑优化
     */
    const inputExpressionReplace = (expression: string, word: string) => {
      const isToken = /[+\-*/]/g.test(expression);

      // 有运算符
      if (isToken) {
        return expression.substring(0, expression.length - 1) + word;
      }

      const isReplace = word.indexOf(expression);

      if (isReplace > -1) {
        return word;
      }

      const index = expression.lastIndexOf(word);

      return (
        expression.substring(0, index) + word + expression.substring(index + 1)
      );
    };

    /**
     * 当前候选列表选中的项
     * @param item
     */
    const onCurrentSelectedHandler = (item: any) => {
      const { name } = item;
      console.log(item);

      // FIXME 拼接选中的内容
      inputVal.value = inputExpressionReplace(inputCache.expr, name);
      // 缓存输入内容
      inputCache.expr = inputVal.value;
      // 关闭候选列表
      candidateRef.value.close();
      // 计算表达式
      expressionComputed(inputCache.expr);
    };

    /**
     * 表达式输入框键盘操作，上｜下｜回车
     * @event keyup
     * @param evt
     */
    const onKeyupHandler = (evt: KeyboardEvent) => {
      const { code } = evt;
      if (code === 'ArrowDown') {
        candidateRef.value.keyboard(1);
      } else if (code === 'ArrowUp') {
        candidateRef.value.keyboard(-1);
      } else if (code === 'Enter') {
        candidateRef.value.keyboard(0);
        // 失焦，触发表达式计算
        inputRef.value.blur();
      }
    };

    /**
     * 渲染弹层
     * @returns
     */
    const renderCandidate = () => (
      <Teleport to={'body'}>
        <Candidate
          ref={candidateRef}
          expression={candidate.expression}
          shortlist={candidate.shortlist}
          targetElem={candidate.targetElem as HTMLInputElement}
          focus={candidate.focus}
          onCurrentSelected={onCurrentSelectedHandler}
        />
      </Teleport>
    );

    const { focus, blur, toValue, toExpression } = useInputExpressionExpose({
      inputVal,
      inputRef,
    });

    expose({
      focus,
      blur,
      toValue,
      toExpression,
    });

    return () => (
      <div class={bemCSSModule()}>
        {renderInputIcon()}
        {renderCandidate()}
        <input
          class={[
            setErrorStyle.value
              ? bemCSSModule('inner')
              : bemCSSModule('inner', 'warn'),
          ]}
          ref={inputRef}
          {...attrs}
          v-model={inputVal.value}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          onInput={onInputHandler}
          onKeyup={onKeyupHandler}
        />
      </div>
    );
  },
});
