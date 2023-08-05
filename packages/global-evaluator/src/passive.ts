/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-28 15:51:00
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-28 15:52:11
 */
import { create, all, format } from 'mathjs';
import type { ConfigOptions } from 'mathjs';

/**
 * 当前文件提供的方法是为了检查 passive 文件。
 * 注意：这里的方法是针对 orca 老项目。
 *
 * Step 1:
 * - 查找 expre_ 开头的属性和值
 * - 查找全局变量
 * - 查找 ExpObj 对象
 *
 * Step 2:
 * 以上三者存在依赖逻辑。例如：
 *
 * const global = [{a: 1}, {b: 2}];
 * const expreX = 'a + 1', expreXMin = 'a + b', expreXMax = 'a + c';
 *
 * console.log(expreX)      // true
 * console.log(expreXMin)  // true
 * console.log(expreXMax)  // false
 *
 * checkPassive() 方法通过正则遍历所有表达式，然后将表达式代入 mathjs 表达式计算器，
 * 如果未报错，那么表达式通过检查，反之，表达式未通过检查。
 */

/**
 *  查找以 expre_ 开头的属性和值
 * @param json
 * @returns
 */
export const findExprePropertys = (json: any) => {
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

/**
 * @description 查找全局变量
 * @param Array
 * @returns {globleParamKey: string, globleParamValue: string}[]
 */
const findGlobleParam = (json: any) => {
  return json.data.tree.attrs.configGlobleParam;
};

/**
 * 查找 ExpObj 对象
 * @param json
 * @returns
 */
export const findExpObj = (json: any) => {
  return json.data.tree.attrs.exp_obj;
};

/**
 * 转换全局变量的属性，输出格式统一的全局变量对象
 * @param data
 * @returns
 */
const formatGlobal = (data: any[]) => {
  const obj = {} as any;
  data.forEach((item) => {
    const { globleParamKey, globleParamValue } = item;
    obj[globleParamKey] = globleParamValue + '';
  });
  return obj;
};

/**
 * 自定义 mathjs 对象
 * @param options
 * @returns
 */
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

/**
 * 检查 passive 文件，如果存在无效的表达式，checked 将会返回 false，并在 result 中列举错误的表达式
 */
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
    const key = (Object.keys(item.exp)[0] as any).replaceAll('"', '');

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
