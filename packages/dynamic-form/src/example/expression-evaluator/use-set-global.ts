/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-06 18:48:11
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-06 19:35:14
 */

import { ref, reactive } from 'vue';
import type { Ref } from 'vue';

import { GlobalEvaluatorWithParser } from './global-evaluator';

type Item = { key: string; val: string };

type UseSetGlobal = {
  globals: Ref<Item[]>;
  inputVal: any;
  defaultMap: any;
  evalWithParser: any;
  addGlobal: () => void;
  clean: () => void;
  reset: () => void;
};

export const useSetGlobal = (): UseSetGlobal => {
  const evalWithParser = new GlobalEvaluatorWithParser();

  const globals: Ref<Item[]> = ref([]);
  const inputVal = reactive({ key: '', val: '' });

  const methods = GlobalEvaluatorWithParser.getMethod();
  const globalParams = [
    { type: 0, name: 'a_height', key: 'a_height', val: '10' },
    { type: 0, name: 'a_width', key: 'a_width', val: '5' },
    { type: 0, name: 'a', key: 'a', val: '1' },
    { type: 0, name: 'b', key: 'b', val: '2' },
    { type: 0, name: 'c', key: 'c', val: '3' },
  ];

  const defaultMap = globalParams.concat(methods);

  defaultMap.forEach((item) => {
    const { name, val } = item;
    globals.value.push({ key: name, val: item.val! });
    evalWithParser.set(name, val);
  });

  const addGlobal = () => {
    const { key, val } = inputVal;
    globals.value.push({ key, val });
    evalWithParser.set(key, val);
  };

  const clean = () => {
    inputVal.val = '';
    inputVal.key = '';
  };

  const reset = () => {
    globals.value = [];
  };

  return {
    globals,
    inputVal,
    defaultMap,
    evalWithParser,

    addGlobal,
    clean,
    reset,
  };
};
