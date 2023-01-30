/*
 * @Author: yuqigong@outlook.com
 * @Date: 2023-01-30 15:20:48
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-30 16:31:39
 * @FilePath: /firmiana/packages/form-plux/button/src/button.ts
 * @Description:
 *
 */

import { buildProps } from '@element-plus/utils'
import type { ExtractPropTypes } from 'vue'

export const buttonProps = buildProps({
  /**
   * @description 控制显示隐藏
   */
  visibility: {
    type: Boolean,
    default: false,
  },
} as const)

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
