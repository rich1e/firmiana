/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-12-20 13:34:35
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-20 16:11:42
 * @FilePath: /vue-form/src/components/DynamicForm/src/hooks/useMultiColumn.ts
 * @Description:
 *
 */

import { MultiColumnType } from '../../types';

/**
 * 根据数据条目分组
 * @param list 数组
 * @param size 条目
 * @returns
 * @see https://blog.csdn.net/LUxxxX/article/details/84975143
 * @example getGroupByEntries([1,2,3,4,5,6,7],3) -> [[1, 2, 3], [4, 5, 6], [7]]
 */
export const getGroupByEntries = (list: any[], size: number) => {
  const result = [];
  let count = 0;
  while (count * size < list.length) {
    result.push(list.slice(count * size, size * (count + 1)));
    count += 1;
  }
  return result;
};

export const getColSpan = (cols: number) => {
  return 24 / cols;
};

export const getGutter = (gutter: number) => {
  return gutter || 20;
};
