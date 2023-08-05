/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-28 13:32:41
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-28 16:19:22
 */
import type { ExtractPropTypes, PropType } from 'vue';

/**
 * ExtractPropTypes
 * @see https://juejin.cn/post/7190781993037070393
 */

/**
 * @description change 事件
 */
export type ChangeEvent = Event & {
  target: {
    value?: string | undefined;
  };
};

/**
 * 表达式输入框参数
 * @returns
 */
export const inputExpressionProps = () => ({
  /** 绑定值 */
  modelValue: {
    type: String,
    required: true,
  },
  /** 数值精度 */
  precision: {
    type: Number,
  },
  /** 是否禁用状态 */
  disabled: {
    type: Boolean,
  },
  /** 原生 input placeholder 属性 */
  placeholder: {
    type: String,
  },
  /** 按下回车时触发 */
  onPressEnter: Function as PropType<(e: KeyboardEvent) => void>,
  /** 按键被松开时触发 */
  onKeydown: Function as PropType<(e: KeyboardEvent) => void>,
  /** 按键按下的时触发 */
  onKeyup: Function as PropType<(e: KeyboardEvent) => void>,
  /** 输入框获得焦点时触发 */
  onFocus: Function as PropType<(e: FocusEvent) => void>,
  /** 输入框失去焦点时触发 */
  onBlur: Function as PropType<(e: FocusEvent) => void>,
  /** 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发 */
  // onChange: Function as PropType<(e: ChangeEvent) => void>,
  /** 在 Input 值改变时触发 */
  onInput: Function as PropType<(e: ChangeEvent) => void>,
});

/**
 * 输入联想显示候选列表参数
 * @returns
 */
export const candidateProps = () => ({
  /** 表达式 */
  expression: {
    type: String,
  },
  /** 候选列表 */
  shortlist: {
    type: Array as PropType<any>,
  },
  /** 输入框 Elemet */
  targetElem: {
    type: Object as PropType<HTMLInputElement>,
  },
  /** 按键 */
  // keystroke: {
  //   type: String,
  // },
  /** 是否获取焦点 */
  focus: {
    type: Boolean,
    default: false,
  },
});

export type CandidateProps = Partial<
  ExtractPropTypes<ReturnType<typeof candidateProps>>
>;

export type InputExpressionProps = Partial<
  ExtractPropTypes<ReturnType<typeof inputExpressionProps>>
>;
