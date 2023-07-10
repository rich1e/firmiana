/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-06-28 14:22:05
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-06 15:33:44
 */
import { create, all, format } from 'mathjs';

import type { MathJsStatic, ConfigOptions } from 'mathjs';
import type { CustomParser, GlobalParam } from './types';

/**
 * 查找以 expre_ 开头的属性和值
 * @param json
 * @returns
 */
const findExprePropertys = (json: any) => {
  const regex = /("expre_[^"]+"):\s*"([^"]*)"/g;
  const expres: any[] = [];

  const format = JSON.stringify(json);

  let matches;
  while ((matches = regex.exec(format))) {
    const property = matches[1];
    const value = matches[2];
    // console.log("Property:", property);
    // console.log("Value:", value);
    if (value && Number.isNaN(parseInt(value))) {
      const obj: any = {};
      obj[property] = value;
      expres.push(obj);
    }
  }
  return expres;
};

const findGlobleParam = (json: any) => {
  return json.data.tree.attrs.configGlobleParam;
};

const findExpObj = (json: any) => {
  return json.data.tree.attrs.exp_obj;
};

const formatGlobal = (data: any[]) => {
  const obj = {} as any;
  data.forEach((item) => {
    const { globleParamKey, globleParamValue } = item;
    obj[globleParamKey] = globleParamValue + '';
  });
  return obj;
};

const customMath = (options?: ConfigOptions) => {
  /**
   * @see https://mathjs.org/docs/core/configuration.html
   */
  const defaults = {
    epsilon: 1e-12,
    matrix: 'Matrix',
    number: 'BigNumber', // Choose 'number' (default), 'BigNumber', or 'Fraction'
    precision: 64, // 64 by default, only applicable for BigNumbers
    predictable: false,
    randomSeed: null,
  };

  const settings = Object.assign({}, defaults, options);

  return create(all, settings);
};

export const checkPassive = (passive: any) => {
  if (passive) {
    // console.log(passive);

    const globals = findGlobleParam(passive);
    const scope = formatGlobal(globals);

    const math = customMath();
    math.import(scope, { override: true });

    const res = findExprePropertys(passive);
    const ret: any[] = [];
    const errs: any[] = [];

    // console.log(globals);
    // console.log(scope);
    // console.log(res);

    res.forEach((expre) => {
      try {
        const key = Object.keys(expre)[0];
        const exp = expre[key];
        /**
         * Analytical Waveguide 组件含有 {x}、{y} 的表达式
         */
        if (!/{x}|{y}/.test(exp)) {
          const val = math.evaluate(expre[key], scope);
          ret.push({ val: format(val), key, exp });
        }
      } catch (error) {
        if (error) {
          errs.push({ exp: expre });
        }
      }
    });

    // console.log(ret);

    return {
      result: errs.length === 0 ? ret : errs,
      checked: errs.length === 0,
    };
  }
  return false;
};

/**
 * 修复passive文件
 * @param passive
 * @param target 属性
 * @returns
 * @description 如果表达式计算
 */
export const fixPassive = (passive: any, target: any[]) => {
  let res = JSON.stringify(passive);

  // 将属性置空
  while (target.length > 0) {
    const item: any = target.pop();
    const key = Object.keys(item.exp)[0].replaceAll('"', '');

    const regex = new RegExp(`"${key}":\\s*"[^"]*"`, 'g');
    res = res.replace(regex, `"${key}": ""`);
  }

  res = JSON.parse(res);

  const expObj = findExpObj(res);

  for (const key in expObj) {
    const expAttr = expObj[key];
    for (const subkey in expAttr) {
      const subAttr = expAttr[subkey];
      if (subAttr === '' && Object.keys(expAttr).length === 1) {
        delete expObj[key];
      }
      if (subAttr === '') {
        delete expAttr[subkey];
      }
    }
  }

  // console.log(res);
  return res;
};

export class GlobalEvaluatorWithParser {
  private math: MathJsStatic;
  private parser: CustomParser;

  constructor(options: ConfigOptions = {}) {
    /**
     * @see https://mathjs.org/docs/core/configuration.html
     */
    const defaults = {
      epsilon: 1e-12,
      matrix: 'Matrix',
      number: 'BigNumber', // Choose 'number' (default), 'BigNumber', or 'Fraction'
      precision: 64, // 64 by default, only applicable for BigNumbers
      predictable: false,
      randomSeed: null,
    };

    const settings = Object.assign({}, defaults, options);

    this.math = create(all, settings);
    this.parser = this.math.parser() as CustomParser;
  }

  static getMethod() {
    const methods: any[] = [];
    const config = {};
    const math: any = create(all, config);
    for (const fn in math) {
      if (typeof math[fn] === 'function' && fn.length < 6) {
        methods.push({
          type: 1,
          name: `${fn}()`,
        });
      }
    }
    return methods;
  }

  get(key: string) {
    return this.parser.get(key);
  }

  set(key: string, value: any) {
    this.parser.set(key, value);
  }

  remove(key: string) {
    this.parser.remove(key);
  }

  getAll() {
    return this.parser.getAll();
  }

  computed(expr: string) {
    try {
      return this.parser.evaluate(expr);
    } catch (error) {
      throw new Error('表达式计算错误');
    }
  }
}

class GlobalEvaluator {
  private math: MathJsStatic | null = null;
  private globalParams: GlobalParam[] = [];

  constructor(options: ConfigOptions = {}) {
    /**
     * @see https://mathjs.org/docs/core/configuration.html
     */
    const defaults = {
      epsilon: 1e-12,
      matrix: 'Matrix',
      number: 'BigNumber', // Choose 'number' (default), 'BigNumber', or 'Fraction'
      precision: 64, // 64 by default, only applicable for BigNumbers
      predictable: false,
      randomSeed: null,
    };

    const settings = Object.assign({}, defaults, options);

    this.math = create(all, settings);
  }

  add(global: GlobalParam) {
    this.globalParams.push(global);
  }

  remove(globalName: string) {
    const idx = this.globalParams
      .map((global, idx) => {
        const { name } = global;
        if (globalName === name) {
          return idx;
        }
      })
      .filter((idx) => idx !== undefined)[0];
    return idx && this.globalParams.splice(idx, 1);
  }

  clear() {
    this.globalParams = [];
  }

  computed(expression: string, scoped: any) {
    if (!expression) return;
    return scoped
      ? this.math?.evaluate(expression, scoped)
      : this.math?.evaluate(expression);
  }

  autoComplete(keywords: string) {}
}
