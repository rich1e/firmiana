/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-28 13:32:41
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-28 13:32:52
 */

import type { Ref } from 'vue';

/**
 * Candidate 参数
 * @todo candidateProps
 */
export interface CandidateProps {
  /** 表达式 */
  expression: string;
  /** 候选列表 */
  shortlist: any[];
  /** 输入框 Elemet */
  targetElem: HTMLInputElement | null;
  /** 按键 */
  // keystroke: string;
  /** 是否获取焦点 */
  focus: boolean;
}

/**
 * Candidate 偏移量
 */
export interface CandidateStyle {
  /** 上偏移量 */
  top: string;
  /** 左偏移量 */
  left: string;
  /** 高度偏移量 */
  height: string;
  /** 宽度偏移量 */
  width: string;
}

/**
 * 表达式输入框对外暴露的方法
 */
export interface UseInputExpressionExpose {
  /** 获得焦点 */
  focus: () => void;
  /** 失去焦点 */
  blur: () => void;
  /** 获取值 */
  toValue: () => void;
  /** 获取表达式 */
  toExpression: () => void;
}

/**
 * 表达式输入框对外暴露的参数
 */
export interface UseInputExpressionExposeProps {
  /** 输入框的值 */
  inputVal: Ref<any>;
  /** 输入框的Ref引用 */
  inputRef: Ref<any>;
}
