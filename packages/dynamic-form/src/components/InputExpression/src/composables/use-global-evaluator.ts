/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-28 13:32:41
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-28 15:54:56
 */
import { GlobalEvaluator } from '@firmiana/global-evaluator';

type Item = { key: string; val: string };

interface UseGlobalEvaluator {
  /** 全局变量表达式计算器 */
  gevaluator: any;
  /** 模拟数据 */
  mock: () => any[];
}

/**
 * @description 全局变量业务函数
 */
export const useGlobalEvaluator = (): UseGlobalEvaluator => {
  const gevaluator = new GlobalEvaluator();

  const globals: Item[] = [];

  const methods = GlobalEvaluator.getMathJSMethodByName();

  const mock = () => {
    const globalParams = [
      { type: 0, name: 'a_height', key: 'a_height', val: '10' },
      { type: 0, name: 'a_width', key: 'a_width', val: '5' },
      { type: 0, name: 'a', key: 'a', val: '1' },
      { type: 0, name: 'b', key: 'b', val: '2' },
      { type: 0, name: 'c', key: 'c', val: '3' },
    ];
    const mockData = globalParams.concat(methods);

    mockData.forEach((item) => {
      const { name, val } = item;
      globals.push({ key: name, val: item.val! });
      gevaluator.set(name, val);
    });

    return mockData;
  };

  return {
    gevaluator,
    mock,
  };
};
