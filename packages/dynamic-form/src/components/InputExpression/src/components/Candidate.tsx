/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-28 13:32:41
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-28 17:23:24
 */
import { computed, defineComponent, ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { createNamespace } from '@firmiana/utils';

import type { MaybeElement, MaybeElementRef } from '@vueuse/core';
import type { Ref } from 'vue';

import type { CandidateStyle } from '../../types';

import { candidateProps } from '../composables/use-props';
import styles from '../index.module.scss';
import { renderFnIcon, renderPlusIcon, renderVariableIcon } from './Icon';

/**
 * 输入时显示联想候选列表功能
 * - 候选列表定位
 * - 候选列表查询和排序，包含变量和函数
 * - 候选列表支持按键操作
 */
export default defineComponent({
  name: 'Candidate',
  props: candidateProps(),
  emits: {
    currentSelected: (item: any) => item,
    expressionComputed: (computed: boolean) => computed,
  },
  setup(props, { expose, emit }) {
    const { bemCSSModule } = createNamespace('candidate', styles);

    const candidateStyle: Ref<CandidateStyle> = ref({
      top: '',
      left: '',
      height: '',
      width: '',
    });
    const candidateResult: Ref<any[]> = ref([]);
    const isShowCandidate = ref(false);
    const isCreate = ref(false);

    // 是否超出滚动内容
    const isScrollMax = computed(() => {
      return candidateResult.value.length > 7;
    });

    /**
     * 根据输入内容控制候选逻辑
     * @param keyword
     */
    const displayCandidate = (keyword: string) => {
      const res = expressionAnalysis(keyword);
      const isEmpty = res.length > 0;

      candidateResult.value = isEmpty ? sortByFirstLetter(res) : [];

      setPosition(props.targetElem!);
      isCreate.value = !isEmpty;
      isShowCandidate.value = isEmpty && true;
    };

    /**
     * 设置弹窗位置
     * @param elem
     */
    const setPosition = (elem: HTMLElement) => {
      /**
       * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
       */
      const { height, width, top, left } = elem.getBoundingClientRect();
      const calcTop = top + height;
      candidateStyle.value = {
        top: `${calcTop}px`,
        left: `${left}px`,
        height: `${height}px`,
        width: `${width}px`,
      };
      // console.log(candidateStyle.value);
    };

    /**
     * 检索分词
     * @param expr
     */
    const expressionAnalysis = (expr: string) => {
      // console.log(keyword);
      // console.log(expr);
      let res;
      if (expr.length === 1 && /\D/.test(expr)) {
        res = search(expr);
      } else {
        const isOperator = /\+|-|\*|\//;
        if (!isOperator.test(expr)) {
          res = search(expr);
        } else {
          const latestKeyword = findLatestKeyword(expr);
          res = search(latestKeyword);
        }
      }
      return res;
    };

    /**
     * 查找最近的keword
     * @param expr
     */
    const findLatestKeyword = (expr: string) => {
      const operators: any[] = [];
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
     * 查询关键字
     * @param keyword
     * @returns
     */
    const search = (keyword: string): any[] => {
      const isOperator = /\+|-|\*|\//;

      // 如果关键词为空，或者不合法
      if (!keyword || isOperator.test(keyword)) {
        return [];
      }

      /**
       * @see https://masteringjs.io/tutorials/fundamentals/regexp-starts-with
       * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions
       */
      const reg = new RegExp(`^${keyword}`);
      return props.shortlist?.filter((item: any) => {
        if (reg.test(item.name)) {
          return item;
        }
      });
    };

    /**
     * 首字母排序
     */
    const sortByFirstLetter = (orig: any[]) => {
      if (!orig || !orig.length) {
        throw new Error('列表不存在，或为空');
      }
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
     * 点击时触发当前选中的项
     * @param item
     */
    const onClickCurrentSelected = (item: any): void => {
      emit('currentSelected', item);
    };

    /**
     * 创建新变量
     */
    const createVariable = () => {
      console.log('createVariable');
    };

    // 点击外部元素或空白时，关闭候选列表
    const target = ref(null);
    onClickOutside(target as unknown as MaybeElementRef<MaybeElement>, () => {
      if (!props.focus) {
        // console.log('outside');
        isShowCandidate.value = false;
      }
    });

    // 当前游标，初始化-1
    const currentIndex = ref(-1);
    const scrollPanelRef: Ref<null | HTMLElement> = ref(null);

    /**
     * 滚动列表
     * @param elem
     * @param total
     * @param cursor
     * @param action
     */
    const trundle = (
      elem: HTMLElement,
      total: number,
      cursor: number,
      action: number,
    ) => {
      // 上边界
      const TOP_BOUNDS = 0;
      // 下边界
      const BOTTOM_BOUNDS = 7;
      // 距离
      const SPACE = 24;

      // 超出下边界，继续下移
      if (cursor >= BOTTOM_BOUNDS && action === 1) {
        elem.scrollTop += SPACE;
      }
      // 超出下边界，继续上移
      else if (cursor >= BOTTOM_BOUNDS && action === -1) {
        elem.scrollTop = (cursor - (BOTTOM_BOUNDS - 1)) * SPACE;
      }
      // 超出上边界，继续上移
      else if (cursor === TOP_BOUNDS && action === -1) {
        elem.scrollTop -= SPACE;
      }
      // 超出上边界，继续下移
      else if (cursor === TOP_BOUNDS && action === 1) {
        elem.scrollTop = -(total - cursor) * SPACE;
      }
    };

    /**
     * 按键操作，支持上下键和回车
     * @param action -1: 上移 | 0: 回车键 | 1 下移
     */
    const keyboard = (action: number) => {
      // 游标
      let cursor = currentIndex.value + action;
      // 总长度
      const total = candidateResult.value.length;

      // 游标上移，到顶时设置游标为总长度的最大值
      if (cursor < 0) cursor = total - 1;
      // 游标下移，到底时重置游标为0
      else if (cursor >= total) cursor = 0;

      // 激活当前选项
      currentIndex.value = cursor;
      // 滚动列表
      trundle(scrollPanelRef.value!, total, cursor, action);

      // 按下回车键
      if (action === 0) {
        const [selected] = candidateResult.value.filter(
          (_, idx) => cursor === idx,
        );
        console.log('按下回车键，当前的值为：', selected);
        selected && emit('currentSelected', selected);
      }
    };

    watch(
      () => props.expression,
      (newVal, oldVal) => {
        console.log('watch', newVal);
        if (newVal !== oldVal) {
          displayCandidate(newVal + '');
        }
      },
    );

    watch(
      () => props.focus,
      (newVal) => {
        console.log(newVal ? '得到焦点' : '失去焦点');
      },
    );

    /**
     * 关闭联想候选列表
     */
    const close = () => {
      isShowCandidate.value = false;
      console.log('close');
    };

    /**
     * 显示联想候选列表
     */
    const open = () => {
      isShowCandidate.value = true;
      console.log('open');
    };

    /**
     * 是否隐藏
     * @returns
     */
    const isHided = () => {
      return isShowCandidate.value;
    };

    expose({
      open,
      close,
      isHided,
      keyboard,
    });

    return () => (
      <div
        ref={target}
        v-show={isShowCandidate.value}
        class={bemCSSModule('mask')}
        style={candidateStyle.value as {}}
      >
        <div class={bemCSSModule('container')}>
          {/* 渲染列表 */}
          {!isCreate.value ? (
            <ul
              class={[
                isScrollMax.value
                  ? bemCSSModule('scroll', 'max')
                  : bemCSSModule('scroll'),
              ]}
              ref={scrollPanelRef}
            >
              {() =>
                candidateResult.value.map((item, idx) => {
                  return (
                    <li
                      class={
                        currentIndex.value === idx
                          ? bemCSSModule('scroll__item', 'active')
                          : bemCSSModule('scroll__item')
                      }
                      onClick={() => onClickCurrentSelected(item)}
                    >
                      {item.type === 0 ? renderVariableIcon() : renderFnIcon()}
                      {item.name}
                    </li>
                  );
                })
              }
            </ul>
          ) : (
            <div class={bemCSSModule('plus')} onClick={createVariable}>
              {renderPlusIcon()} Create a new variable
            </div>
          )}
        </div>
      </div>
    );
  },
});
