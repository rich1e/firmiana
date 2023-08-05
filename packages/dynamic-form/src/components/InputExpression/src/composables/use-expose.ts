/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-28 13:32:41
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-28 13:33:54
 */

import type {
  UseInputExpressionExpose,
  UseInputExpressionExposeProps,
} from '../../types';

/**
 * @description 表达式输入框对外暴露的函数
 */
export const useInputExpressionExpose = (
  props: UseInputExpressionExposeProps,
): UseInputExpressionExpose => {
  const { inputVal, inputRef } = props;

  const toValue = () => {
    return inputVal.value;
  };

  const toExpression = () => {
    return inputVal.value;
  };

  const focus = () => {
    inputRef.value?.focus();
  };

  const blur = () => {
    inputRef.value?.blur();
  };

  return {
    focus,
    blur,
    toValue,
    toExpression,
  };
};
