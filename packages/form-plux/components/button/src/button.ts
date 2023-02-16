/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-02-15 18:57:34
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-02-16 13:04:19
 * @FilePath     : /firmiana/packages/form-plux/components/button/src/button.ts
 * @Description  :
 *
 */

import { buildProps } from '@element-plus/utils';
import type { ExtractPropTypes } from 'vue';

export const buttonProps = buildProps({
  /**
   * @description 控制显示隐藏
   */
  visibility: {
    type: Boolean,
    default: false,
  },
} as const);

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
